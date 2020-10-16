import wp from "../authentication";
export const addMedia = async (title, alt_text, caption, description, data) => {
  wp.media()
    .file(data)
    .create({
      title: title,
      alt_text: alt_text,
      caption: caption,
      description: description,
      status: "publish",
    })
    .then(function (response) {
      // "response" will hold all properties of your newly-created post,
      // including the unique `id` the post was assigned on creation
      console.log(response.id);
      console.log(response.title);
      console.log(response.alt_text);
      console.log(response.caption);
      console.log(response.description);
    });
  return;
};
export const updateMedia = async (
  id,
  title,
  alt_text,
  caption,
  description,
  data
) => {

  wp.media()
    .id(id)
    .file(data)
    .update({
      title: title,
      alt_text: alt_text,
      caption: caption,
      description: description,
      status: "publish",
    })
    .then(function (response) {
      console.log(response.id);
      console.log(response.title);
      console.log(response.alt_text);
      console.log(response.caption);
      console.log(response.description);
    });
};
export const deleteMedia = async (id,data) => {
  wp.media()
    .id(id)
    .file(data)
    .delete({force: true})
    .then(function (response) {
      console.log(response);
    });
};
