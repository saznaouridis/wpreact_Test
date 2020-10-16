import wp from "../authentication";
export const addCategory = async (name, description, slug) => {
  wp.categories()
    .create({
      // "title" and "content" are the only required properties
      name: name,
      description: description,
      slug: slug,
      // Post will be created as a draft by default if a specific "status"
      // is not specified
      status: "publish",
    })
    .then(function (response) {
      // "response" will hold all properties of your newly-created post,
      // including the unique `id` the post was assigned on creation
      console.log(response.id);
      console.log(response.name);
      console.log(response.description);
    });
  return;
};
export const updateCategory = async (id, name, description, slug) => {
  wp.categories()
    .id(id)
    .update({
      // Update the title
      name: name,
      description: description,
      slug: slug,
      // Set the post live (assuming it was "draft" before)
      status: "publish",
    })
    .then(function (response) {
      console.log(response);
    });
};
export const deleteCategory = async (id) => {
  wp.categories()
    .id(id)
    .delete({ force: true })
    .then(function (response) {
      console.log(response);
    });
};
