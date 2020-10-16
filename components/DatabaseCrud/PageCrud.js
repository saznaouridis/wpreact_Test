import wp from "../authentication";
export const addPage = async (title, content) => {
  wp.pages()
    .create({
      // "title" and "content" are the only required properties
      title: title,
      content: content,
      // Page will be created as a draft by default if a specific "status"
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
export const updatePage = async (id, title, content, slug, date) => {
  wp.pages()
    .id(id)
    .update({
      // Update the title
      title: title,
      content: content,
      slug: slug,
      date: date,

      // Set the Page live (assuming it was "draft" before)
      status: "publish",
    })
    .then(function (response) {
      console.log(response);
    });
};
export const deletePage = async (id) => {
  wp.pages()
    .id(id)
    .delete({})
    .then(function (response) {
      console.log(response);
    });
};
