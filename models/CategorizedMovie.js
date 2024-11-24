export default class CategorizedMovie {
  constructor(
    id_movie,
    id_categoria,
    title_movie,
    image_movie,
    category,
    description_category
  ) {
    this.id_movie = id_movie;
    this.id_categoria = id_categoria;
    this.title_movie = title_movie;
    this.image_movie = image_movie;
    this.category = category;
    this.description_category = description_category;
  }
}
