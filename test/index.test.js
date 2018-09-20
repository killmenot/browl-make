'use strict';

const sinon = require('sinon');
const browlUtil = require('browl-util');
const MakeStrategy = require('../');

describe('browl-make', () => {
  let sandbox;
  let strategy;
  let repo;
  let rootConfig;
  let repoConfig;
  let options;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    repo = 'webapp';
    rootConfig = {
      foo: 'bar'
    };
    repoConfig = {
      baz: 'quux'
    };

    strategy = new MakeStrategy(repo, rootConfig, repoConfig);

    options = {
      cwd: '/'
    };

    sandbox.stub(browlUtil, 'run').resolves();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#create', () => {
    it('should run create scenario', (done) => {
      strategy.create('develop', options).then(() => {
        expect(browlUtil.run.firstCall).be.calledWith('make', ['install'], options);
        expect(browlUtil.run.secondCall).be.calledWith('make', ['up'], options);

        done();
      });
    });
  });

  describe('#update', () => {
    it('should run update scenario', (done) => {
      strategy.update('develop', options).then(() => {
        expect(browlUtil.run.firstCall).be.calledWith('make', ['install'], options);
        expect(browlUtil.run.secondCall).be.calledWith('make', ['restart'], options);

        done();
      });
    });
  });

  describe('#delete', () => {
    it('should run delete scenario', (done) => {
      strategy.delete('develop', options).then(() => {
        expect(browlUtil.run.firstCall).be.calledWith('make', ['stop'], options);

        done();
      });
    });
  });

  describe('#start', () => {
    it('should run start scenario', (done) => {
      strategy.start('develop', options).then(() => {
        expect(browlUtil.run.firstCall).be.calledWith('make', ['start'], options);

        done();
      });
    });

    it('should run start scenario in force mode', (done) => {
      options.force = true;

      strategy.start('develop', options).then(() => {
        expect(browlUtil.run.firstCall).be.calledWith('make', ['up'], options);

        done();
      });
    });
  });

  describe('#stop', () => {
    it('should run stop scenario', (done) => {
      strategy.stop('develop', options).then(() => {
        expect(browlUtil.run.firstCall).be.calledWith('make', ['stop'], options);

        done();
      });
    });
  });

  describe('#restart', () => {
    it('should run restart scenario', (done) => {
      strategy.restart('develop', options).then(() => {
        expect(browlUtil.run.firstCall).be.calledWith('make', ['restart'], options);

        done();
      });
    });
  });
});
