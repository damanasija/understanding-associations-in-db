
/*
-------------------------------------------------------------------------------------------------------

              ------------This just creates embedded documents------------------

-------------------------------------------------------------------------------------------------------
  We can add date to database by creating instances of the models we just created.
  for example, we first create a schema of how a user looks like.
  the we create a model of it where we actually bind the the schema to a collection in the database.
  And the reference of it will be stored in a variable User when we write:
  const User = mongoose.model('User', userSchema); -----> so this line binds the schema to the collection named "users" in the database
  Mongoose has a library to create collections. We need to provide a singular entity in the first parameter of mongoose.model() function;
  Now we can either add data to dbs by using User.create(object) but we can also instanciate the User model and store it to a variable.
  example:
        let newUser = new User({
          email: "john.doe@win.ru",
          name: "John Doe";
        });
      Still data will not be added to the db. We need to use the .save fucntion of ths instance of the User model,
      so what we can do is newUser.save();
  Enough of mongoose.
  What we want to do is express the relationships of teh various collections of the database.
  example a user can have multipl posts so we need to represnt a one : many relationship between a user and a post
  this is done in mongoose when we create the schema;
  so our userSchema has three keys:-
        1) name
        2) email
        3) Bunch of posts;
    so 3 can be represented as an array of posts. to show it, we write the key - value pair as
    posts: [postSchema] as the posts follow a postSchema
*/

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo");

// POST - title, content
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Post = mongoose.model("Post", postSchema);

// USER - email, name
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema] //This signifies that a user has a list of posts(one : many relationship).
                      //In order to use this, we have to define postSchema before the userSchema
});

const User = mongoose.model("User", userSchema);

let harry = new User({
  name: "Harry Potter",
  email: "harry.potter@win.ru"
});


harry.posts.push({
  title: "Trying out new things",
  content: "Nothing!"
});

harry.save(); //actually saves harry to database and save's harry's comments to the user's database

/*
  this doesn't save the post in posts collection. instead it just saves it in harry's array of posts/
  this is becuase we never did Post.create({title:"some title", content: "contentt goes here"}); for harry's post.
  meaning that we never saved it.
  An this is just the creation of embedded documents. i.e. a document inside a document. or in this case
  multiple documents can be nested/embedded inside the document.
*/
