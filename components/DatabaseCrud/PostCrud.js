import wp from "../authentication";
export const addPost = async (title, content) => {
  wp.posts()
    .create({
      // "title" and "content" are the only required properties
      title: title,
      content: content,
      // Post will be created as a draft by default if a specific "status"
      // is not specified
      status: "publish",
    })
    .then(function (response) {
      // "response" will hold all properties of your newly-created post,
      // including the unique `id` the post was assigned on creation
      console.log(response.id);
      console.log(response.title);
      console.log(response.content);
    });
  return;
};
export const updatePost = async (id, title, content, date) => {
  wp.posts()
    .id(id)
    .update({
      // Update the title
      title: title,
      content: content,
      date: date,
      // Set the post live (assuming it was "draft" before)
      status: "publish",
    })
    .then(function (response) {
      console.log(response);
    });
};
export const deletePost = async (id) => {
  wp.posts()
    .id(id)
    .delete({})
    .then(function (response) {
      console.log(response);
    });
};
