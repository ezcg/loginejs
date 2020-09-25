// This is a hierarchy with admin at the top. The role above has all the access that the roles below it have.
// admin > moderator > moderator_user, user
// admin - can elevate other's access levels
// moderator - can publish other's
// 'moderator_user' is a placeholder that may allow for as yet to be determined privileges. I was thinking a trusted user of sorts that could publish/deploy/whatever stuff that might be specific to their own created content. For example, a moderator_user could publish his own content, but not others.
// user - can publish their own and access them via the admin page, but a moderator or above must 'distribute' it
// to make it accessible via the category list

module.exports = {
  banned: 0,
  user: 1,
  // moderator_user: 3,
  moderator: 5,
  admin:7
};
