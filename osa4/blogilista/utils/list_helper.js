const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(p => p.likes).reduce((a,p) => a+p)
    return likes
}

const favoriteBlog = (blogs) => {
    const most = blogs.reduce((a,p) => a.likes < p.likes ? p : a)
    return most
}

const mostBlogs = (blogs) => {
    let group = _.mapValues(_.groupBy(blogs, a => a.author), o => o.length)
    group = _.reduce(group, (r, v, k) => {
        if(_.isEmpty(r))
            return (r = {author: k, blogs: v})
        else
            return (r.blogs < v ? {author: k, blogs: v} : r)
    }, {})
    return group
}

const mostLikes = (blogs) => {
    let group = _.groupBy(blogs, a => a.author)
    group = _.map(group, (a, i) => {
        return {author: i, likes: a.map(a => a.likes).reduce((r, i) => r+i)}
    })
    group = _.reduce(group, (r,v,k) => {
        if(_.isEmpty(r))
            return (r = {author: v.author, likes: v.likes})
        else
            return (r.likes < v.likes ? {author: v.author, likes: v.likes} : r)
    },{})
    return group
   
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}