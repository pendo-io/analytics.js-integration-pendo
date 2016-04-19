'use strict';

var Analytics = require('analytics.js-core').constructor;
var integration = require('analytics.js-integration');
var sandbox = require('clear-env');
var tester = require('analytics.js-integration-tester');
var Pendo = require('../lib/');

var noop = function() {};

describe('Pendo', function() {
  var analytics;
  var pendo;
  var options = {
    apiKey: 'an-id-to-test-with'
  };

  beforeEach(function() {
    analytics = new Analytics();
    pendo = new Pendo(options);
    analytics.use(Pendo);
    analytics.use(tester);
    analytics.add(pendo);

    analytics.user();
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    pendo.reset();
    analytics.user().reset();
    sandbox();
  });

  it('should have the right settings', function() {
    analytics.compare(Pendo,
      integration('Pendo')
        .global('pendo')
        .option('apiKey', '')
    );
  });

  describe('before loading', function() {
    beforeEach(function() {
      analytics.stub(pendo, 'load');
    });

    // afterEach(function() {
    //   pendo.reset();
    // });

    describe('#initialize', function() {
    //   beforeEach(function() {
    //     analytics.initialize();
    //     // analytics.page();
    //   });
      it('should create window.pendo_options', function() {
        analytics.assert(!window.pendo_options);
        analytics.initialize();
        analytics.assert(window.pendo_options);
      });

      it('should create a pendo_options object using API', function() {
        analytics.assert.deepEqual(window.pendo_options, {
          apiKey: options.apiKey,
          usePendoAgentAPI: true
        });
      });

      it('should load', function() {
        analytics.called(pendo.load);
      });

      it('should be ready', function() {
        analytics.called(pendo.ready);
      });
    });
  });

  describe('before loaded', function() {
    beforeEach(function() {
      pendo.load = noop;
      analytics.initialize();
    //   analytics.page();
    });

    describe('on identify', function() {
      beforeEach(function() {
        analytics.identify('id');
      });

    //   it('should store the identify', function() {
    //     analytics.assert(window.chmln.identify_a[0].length === 1);
    //
    //     analytics.assert.deepEqual({ uid: 'id' }, window.chmln.identify_a[0][0]);
    //   });
    });
  });

  // describe('loading', function() {
  //   it('should load', function(done) {
  //     analytics.load(pendo, done);
  //   });
  // });
  //
  // describe('after loading', function() {
  //   beforeEach(function(done) {
  //     analytics.once('ready', done);
  //     analytics.initialize();
  //   //   analytics.page();
  //   });
  //
  //   describe('#identify', function() {
  //     beforeEach(function() {
  //       analytics.spy(window.pendo, 'identify');
  //     });
  //
  //   //   it('should identify with the anonymous user id', function() {
  //   //     analytics.identify();
  //   //     analytics.called(window.pendo.identify, { uid: 'anon-id' });
  //   //   });
  //     //
  //   //   it('should identify with the given id', function() {
  //   //     analytics.identify('id');
  //   //     analytics.called(window.pendo.identify, { uid: 'id' });
  //   //   });
  //     //
  //   //   it('should send traits', function() {
  //   //     analytics.identify({ trait: true });
  //   //     analytics.called(window.chmln.identify, { uid: 'anon-id', trait: true });
  //   //   });
  //     //
  //   //   it('should send the given id and traits', function() {
  //   //     analytics.identify('id', { trait: true });
  //   //     analytics.called(window.chmln.identify, { uid: 'id', trait: true });
  //   //   });
  //   });
  //
  //   describe('#group', function() {
  //     beforeEach(function() {
  //       analytics.stub(window.pendo, 'identify');
  //     });
  //
  //   //   it('should send an id', function() {
  //   //     analytics.group('id');
  //   //     analytics.called(window.chmln.set, { 'group:id': 'id' });
  //   //   });
  //     //
  //   //   it('should send traits', function() {
  //   //     analytics.group({ trait: true });
  //   //     analytics.called(window.chmln.set, { 'group:id': null, 'group:trait': true });
  //   //   });
  //     //
  //   //   it('should send an id and traits', function() {
  //   //     analytics.group('id', { trait: true });
  //   //     analytics.called(window.chmln.set, { 'group:id': 'id', 'group:trait': true });
  //   //   });
  //   });
  // });
});
