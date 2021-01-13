// EMBEDED DATA
let author = {
  name: 'Frank Herbert',
  article: [
    {
      title: 'Deep Sea Creature Found',
      body: 'asdf asdf asf asdf sadfasdf.',
    },
    {
      title: 'This Years Horoscope Predictions',
      body: 'asdf asdf asf asdf sadfasdf.',
    },
  ]
};

let article = {
  title: 'Deep Sea Creature Foundddddd',
  body: 'asdf asdf asf asdf sadfasdf.',
  author: {
    name: 'Frank Herbert'
  }
}

////////////////////////////////////////////////////
// REFERENCE DATA
let author = {
  _id: ObjectId('1234124312424124'),
  name: 'Frank A. Herbert',
  articles: [
    ObjectId('8908908908900078789'),
    ObjectId('1243123412431234214'),
    ObjectId('57772725724242424242'),
  ]
};

let article = {
  _id: ObjectId('8908908908900078789'),
  title: 'Deep Sea Creature Foundddddd',
  body: 'asdf asdf asf asdf sadfasdf.',
  author: ObjectId('1234124312424124')
}
