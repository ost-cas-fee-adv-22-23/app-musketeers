locals {
  name       = "cas-demo"
  gcp_region = "europe-west6"
}

provider "google" {
  project = "cas-test-demo-run"
  region  = local.gcp_region
}

data "google_project" "project" {
}

terraform {
  backend "gcs" {
    bucket = "cas-test-demo-run-tf-state"
  }
}