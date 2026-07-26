mod data;
mod data_mapper;

use std::sync::Arc;

use axum::extract::{Path, State};
use axum::routing::get;
use axum::{Json, Router};
use tower_http::cors::{Any, CorsLayer};
use tower_http::services::ServeDir;

use data_mapper::DataMapper;

use crate::data::Devotion;

async fn get_devotion_of_the_day(State(data_mapper): State<Arc<DataMapper>>) -> Json<Devotion> {
    Json(data_mapper.get_devotion_of_the_day().clone())
}

async fn get_devotion_of(
    State(data_mapper): State<Arc<DataMapper>>,
    Path(date): Path<String>,
) -> Json<Devotion> {
    Json(data_mapper.get_devotion_of(&date).clone())
}

async fn get_next_sunday(State(data_mapper): State<Arc<DataMapper>>) -> Json<Devotion> {
    Json(data_mapper.get_next_sunday().clone())
}

#[tokio::main]
async fn main() {
    let data_mapper = Arc::new(DataMapper::new());

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/api/devotion/today", get(get_devotion_of_the_day))
        .route("/api/devotion/{date}", get(get_devotion_of))
        .route("/api/devotion/sunday", get(get_next_sunday))
        .fallback_service(ServeDir::new("../frontend/dist"))
        .layer(cors)
        .with_state(data_mapper);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();

    println!("Listening on http://localhost:3000");

    axum::serve(listener, app).await.unwrap();
}
