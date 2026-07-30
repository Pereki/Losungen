mod data;
mod devotion_data_mapper;
mod liturgical_data_mapper;

use std::sync::Arc;

use axum::extract::{Path, State};
use axum::routing::get;
use axum::{Json, Router};
use tower_http::cors::{Any, CorsLayer};
use tower_http::services::ServeDir;

use devotion_data_mapper::DevotionalDataMapper;

use crate::data::{Devotion, LiturgicalDay};

use crate::liturgical_data_mapper::LitugicalDayDataMapper;

async fn get_devotion_of_the_day(
    State(data_mapper): State<Arc<DevotionalDataMapper>>,
) -> Json<Devotion> {
    Json(data_mapper.get_devotion_of_the_day().clone())
}

async fn get_devotion_of(
    State(data_mapper): State<Arc<DevotionalDataMapper>>,
    Path(date): Path<String>,
) -> Json<Devotion> {
    Json(data_mapper.get_devotion_of(&date).clone())
}

async fn get_next_church_day(
    State(data_mapper): State<Arc<DevotionalDataMapper>>,
) -> Json<Devotion> {
    Json(data_mapper.get_next_church_day())
}

async fn get_liturgical_day(
    State(data_mapper): State<Arc<LitugicalDayDataMapper>>,
    Path(date): Path<String>,
) -> Json<Vec<LiturgicalDay>> {
    Json(data_mapper.get_litugical_day_of(&date))
}

async fn get_all_liturgical_days(
    State(data_mapper): State<Arc<LitugicalDayDataMapper>>,
) -> Json<Vec<Vec<LiturgicalDay>>> {
    Json(data_mapper.get_all_liturgical_days())
}

#[tokio::main]
async fn main() {
    let data_mapper = Arc::new(DevotionalDataMapper::new());
    let litugical_day_data_mapper = Arc::new(LitugicalDayDataMapper::new());

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/api/devotion/today", get(get_devotion_of_the_day))
        .route("/api/devotion/{date}", get(get_devotion_of))
        .route("/api/church-days/next", get(get_next_church_day))
        .with_state(data_mapper)
        .route("/api/liturgical-day/{date}", get(get_liturgical_day))
        .route("/api/liturgical-days", get(get_all_liturgical_days))
        .with_state(litugical_day_data_mapper)
        .fallback_service(ServeDir::new("../frontend/dist"))
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();

    println!("Listening on http://localhost:3000");

    axum::serve(listener, app).await.unwrap();
}
