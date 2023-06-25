resource "google_service_account" "cloud-runner" {
  account_id   = "cloud-runner"
  display_name = "Google Cloud Run"
  description  = "Account to deploy applications to google cloud run."
}

resource "google_project_iam_member" "cloud-runner" {
  for_each = toset([
    "roles/run.serviceAgent",
    "roles/viewer",
    "roles/storage.objectViewer",
    "roles/run.admin",
    "roles/cloudsql.client"
  ])
  role    = each.key
  member  = "serviceAccount:${google_service_account.cloud-runner.email}"
  project = data.google_project.project.id
}

resource "google_project_iam_member" "cloud-runner-svc" {
  role    = "roles/run.serviceAgent"
  member  = "serviceAccount:service-${data.google_project.project.number}@serverless-robot-prod.iam.gserviceaccount.com"
  project = data.google_project.project.id
}

output "cloud-runner-email" {
  value = google_service_account.cloud-runner.email
}

variable "commit_hash" {
  type = string
  description = "value of the commit hash of the Docker image to deploy"
}

resource "random_uuid" "random_nextauth_secret" {
}

resource "google_cloud_run_service" "cas-fee-advanced-mumble" {
  name                       = local.name
  location                   = local.gcp_region
  autogenerate_revision_name = true

  template {
    spec {
      containers {
        image = "europe-west6-docker.pkg.dev/cas-fee-advanced-mumble/mumble/image:${var.commit_hash}"

        resources {
          limits = {
            "memory" = "256Mi"
          }
        }

        ports {
          name           = "http1"
          container_port = 8080
        }

        env {
          name  = "NEXT_PUBLIC_API_BASE_URL"
          value = "https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app"
        }

        env {
          name  = "ZITADEL_CLIENT_ID"
          value = "181236603920908545@cas_fee_adv_qwacker_prod"
        }

        env {
          name  = "ZITADEL_ISSUER"
          value = "https://cas-fee-advanced-ocvdad.zitadel.cloud"
        }

        env {
          name  = "NEXTAUTH_SECRET"
          value = "${random_uuid.random_nextauth_secret.result}"
        }

        env {
          name  = "NEXTAUTH_URL"
          value = "https://cas-mumble-jku2yeh7fa-oa.a.run.app/"
        }

      }

      service_account_name = google_service_account.cloud-runner.email
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

output "cloud-run-url" {
  value = google_cloud_run_service.cas-fee-advanced-mumble.status[0].url
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.cas-fee-advanced-mumble.location
  project  = google_cloud_run_service.cas-fee-advanced-mumble.project
  service  = google_cloud_run_service.cas-fee-advanced-mumble.name

  policy_data = data.google_iam_policy.noauth.policy_data
}