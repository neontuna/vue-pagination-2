'use strict';

module.exports = function () {

  return function (h) {

    var theme = this.Theme;
    var alignText = this.align + "Text";
    var items = [];
    var prevChunk = '';
    var nextChunk = '';

    if (this.chunksNavigation === 'fixed') {

      prevChunk = h(
        'a',
        { 'class': theme.link,
          attrs: { href: 'javascript:void(0);',
            disabled: !!this.allowedChunkClass(-1)
          },
          on: {
            'click': this.setChunk.bind(this, -1)
          }
        },
        ['<<']
      );

      nextChunk = h(
        'a',
        { 'class': theme.link,
          attrs: { href: 'javascript:void(0);',
            disabled: !!this.allowedChunkClass(1)
          },
          on: {
            'click': this.setChunk.bind(this, 1)
          }
        },
        ['>>']
      );
    }

    this.pages.map(function (page) {
      items.push(h(
        'a',
        { 'class': theme.link + ' ' + this.activeClass(page),
          attrs: { href: 'javascript:void(0)',
            role: 'button'
          },
          on: {
            'click': this.setPage.bind(this, page)
          }
        },
        [page]
      ));
    }.bind(this));

    return h(
      'div',
      { 'class': 'VuePagination ' + theme.wrapper },
      [h(
        'nav',
        { 'class': '' + theme.nav },
        [prevChunk, h(
          'a',
          { 'class': theme.link,
            attrs: { href: 'javascript:void(0);',
              disabled: !!this.allowedPageClass(this.page - 1)
            },
            on: {
              'click': this.prev.bind(this)
            }
          },
          ['<']
        ), items, h(
          'a',
          { 'class': theme.link,
            attrs: { href: 'javascript:void(0);',
              disabled: !!this.allowedPageClass(this.page + 1)
            },
            on: {
              'click': this.next.bind(this)
            }
          },
          ['>']
        ), nextChunk]
      ), h(
        'p',
        {
          directives: [{
            name: 'show',
            value: parseInt(this.records)
          }],

          'class': 'VuePagination__count ' + theme.count },
        [this.count]
      )]
    );
  };
};