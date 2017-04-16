import * as express from 'express';

import CatsCtrl from './controllers/cats';
import Cat from './models/cat.model';

import PhotosCtrl from './controllers/photos';
import Photo from './models/photo.model';

export default function setRoutes(app) {

  const cats = new CatsCtrl();
  const photos = new PhotosCtrl();
  // APIs - cat
  app.route('/api/cats').get(cats.getAll);
  app.route('/api/cats/count').get(cats.count);
  app.route('/api/cat').post(cats.insert);
  app.route('/api/cat/:id').get(cats.get);
  app.route('/api/cat/:id').put(cats.update);
  app.route('/api/cat/:id').delete(cats.delete);

  //APIs - photo
  app.route('/api/photos').get(photos.getAll);
  app.route('/api/photos/count').get(photos.count);
  app.route('/api/photo').post(photos.insert);
  app.route('/api/photo/:id').get(photos.get);
  app.route('/api/photo/:id').put(photos.update);
  app.route('/api/photo/:id').delete(photos.delete);

}
