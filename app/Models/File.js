"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Env = use("Env");

class File extends Model {
  static get computed() {
    return ["url"];
  }
  getUrl({ id }) {
    return `${"http://165.227.83.46:3333"}/files/${id}`;
  }
}

module.exports = File;
