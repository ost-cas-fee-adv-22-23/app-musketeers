locals {
  name       = "cas-mumble"
  gcp_region = "europe-west6"
}

provider "google" {
  project = "cas-fee-advanced-mumble"
  region  = local.gcp_region
}

data "google_project" "project" {
}

terraform {
  backend "gcs" {
    bucket = "cas-fee-advanced-mumble-tf-state"
  }
}