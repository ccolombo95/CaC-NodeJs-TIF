export default class Movie {
  constructor(
    title,
    description,
    image,
    duration,
    date,
    director,
    director2,
    writer,
    category,
    views = 0
  ) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.duration = duration;
    this.date = date;
    this.director = director;
    this.director2 = director2;
    this.writer = writer;
    this.category = category;
    this.views = views;
  }
}
