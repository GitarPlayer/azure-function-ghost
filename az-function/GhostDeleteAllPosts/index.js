module.exports = async function (context, req) {
    const GhostAdminAPI = require('@tryghost/admin-api');
    const api = new GhostAdminAPI({
        url: process.env["GHOST_URL"],
        key: process.env["GHOST_ADMIN_KEY"],
        version: process.env["GHOST_API_VERSION"]
    });
    api.posts
        .browse({limit: "all"})
        .then((posts) => {
            posts.forEach((post) => {
                api.posts.delete({id: post.id});
                
            });
        })
        .catch((err) => {
            console.error(err);
        });    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "All posts have been deleted successfully."
    };
}