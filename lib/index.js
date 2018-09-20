'use strict';

const browlUtil = require('browl-util');

/**
 * Make strategy allows browl to deploy an instance is managed by Makefile.
 * Makefile must have the following targets: install, start, stop, restart, up
 */
class MakeStrategy {

  /**
   * @param {String} repo
   * @param {Object} rootConfig
   * @param {Object} repoConfig
   */
  constructor(repo, rootConfig, repoConfig) {
    this.name = 'make';
    this.repo = repo;
    this.rootConfig = rootConfig;
    this.repoConfig = repoConfig;
  }

  /**
   * Runs operations when instance created
   *
   * @param  {String} branch
   * @param  {Object} options
   * @return {Promise}
   */
  create(branch, options) {
    return browlUtil.run('make', ['install'], options)
      .then(() => {
        return browlUtil.run('make', ['up'], options);
      });
  }

  /**
   * Runs operations when instance updated
   *
   * @param  {String} branch
   * @param  {Object} options
   * @return {Promise}
   */
  update(branch, options) {
    return browlUtil.run('make', ['install'], options)
      .then(() => {
        return browlUtil.run('make', ['restart'], options);
      });
  }

  /**
   * Runs operations when instance deleted
   *
   * @param  {String} branch
   * @param  {Object} options
   * @return {Promise}
   */
  delete(branch, options) {
    return browlUtil.run('make', ['stop'], options);
  }

  /**
   * Runs operations when instance needs to be started
   *
   * @param  {String} branch
   * @param  {Object} options
   * @return {Promise}
   */
  start(branch, options) {
    return browlUtil.run('make', [options.force ? 'up' : 'start'], options);
  }

  /**
   * Runs operations when instance needs to be stopped
   *
   * @param  {String} branch
   * @param  {Object} options
   * @return {Promise}
   */
  stop(branch, options) {
    return browlUtil.run('make', ['stop'], options);
  }

  /**
   * Runs operations when instance needs to be restarted
   *
   * @param  {String} branch
   * @param  {Object} options
   * @return {Promise}
   */
  restart(branch, options) {
    return browlUtil.run('make', ['restart'], options);
  }
}

module.exports = MakeStrategy;
