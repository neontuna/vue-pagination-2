module.exports = function() {
  
  return function(h) {
    
    var theme = this.Theme;
    var alignText = this.align + "Text";
    var items = [];
    var prevChunk = '';
    var nextChunk = '';

    if (this.chunksNavigation==='fixed') {
     
     prevChunk =  
      <a class={theme.link} 
      href="javascript:void(0);"
      disabled={!!this.allowedChunkClass(-1)} 
      on-click={this.setChunk.bind(this,-1)}>&lt;&lt;</a>
     
     nextChunk = 
      <a class={theme.link} 
      href="javascript:void(0);"
      disabled={!!this.allowedChunkClass(1)}
      on-click={this.setChunk.bind(this,1)}>&gt;&gt;</a>
      
    }
       
    this.pages.map(function(page) {
      items.push(
        <a class={`${theme.link} ${this.activeClass(page)}`} 
        href="javascript:void(0)"
        role="button"
        on-click={this.setPage.bind(this, page)}>{page}</a>
      )
    }.bind(this));
    
    return <div class={`VuePagination ${theme.wrapper}`}><nav class={`${theme.nav}`}>

    {prevChunk} 

    <a class={theme.link} 
    href="javascript:void(0);"
    disabled={!!this.allowedPageClass(this.page-1)} 
    on-click={this.prev.bind(this)}>&lt;</a>

    {items}

    <a class={theme.link} 
    href="javascript:void(0);"
    disabled={!!this.allowedPageClass(this.page+1)} 
    on-click={this.next.bind(this)}>&gt;</a>

    {nextChunk}

    </nav>

    <p v-show={parseInt(this.records)}
    class={`VuePagination__count ${theme.count}`}>{this.count}</p>
    </div>
  }
}
