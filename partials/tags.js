var abe_tags_fake = document.querySelector('#abe_tags_fake')
var add_abe_tags = document.querySelector('#add_abe_tags')
var tags_wrapper = document.querySelector('.tags-wrapper')

new autoComplete({
    selector: '#abe_tags_fake',
    source: function(term, response){
        try { xhr.abort(); } catch(e){}
        xhr = $.getJSON('/plugin/abe-tags/search', { q: term }, function(data) {
          response(data.result);
        });
    }
});

var tags = []
function setTags() {
  tags = []
  var tagsList = [].slice.call(document.querySelectorAll('.abe_tags_fake_item'))
  Array.prototype.forEach.call(tagsList, (tag) => {
    tags.push(tag.innerHTML.replace('<span class="glyphicon glyphicon-remove" data-tags-remove="true"></span>', ''))
  })
  abe.json.data.abe_tags = tags
}

function removeTags() {
  this.parentNode.parentNode.removeChild(this.parentNode)
  setTags()
}

var oldTags = [].slice.call(document.querySelectorAll('[data-tags-remove]'))
Array.prototype.forEach.call(oldTags, (oldTag) => {
  oldTag.addEventListener('click', removeTags)
})

// abe_tags_fake.value = abe_tags.value
function add(value) {
  var div = document.createElement('div')
  div.classList.add('abe_tags_fake_item')
  div.innerHTML = '' + value + '<span class="glyphicon glyphicon-remove" data-tags-remove="true"></span>'
  tags_wrapper.appendChild(div)

  div.querySelector('[data-tags-remove]').addEventListener('click', removeTags)
  setTags()

  abe_tags_fake.value = ''
}

Array.prototype.forEach.call(tags, (tag) => {
  if (tag !== '') {
    add(tag)
  }
})

if(typeof abe_tags_fake !== 'undefined' && abe_tags_fake !== null) {
  add_abe_tags.addEventListener('click', function (e) {
    e.preventDefault()
    if(abe_tags_fake.value !== '') {
      add(abe_tags_fake.value)
    }
  })

  abe_tags_fake.addEventListener('keyup', function (e) {
    // abe_tags.value = tagsMerged
  })

  abe_tags_fake.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 13:
        // enter
        e.preventDefault()
        add(abe_tags_fake.value)
      }
  })
}

abe.json.saving(function (e) {
  setTags()
})