const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const reducer = (totalLikes, blog) => {
        return totalLikes + blog.likes;
    }

    return blogs.reduce(reducer, 0); // start summation with initial value 0
};

const favoriteBlog = (blogs) => {
    const reducer = (favorite, blog) => {
        return blog.likes > favorite.likes ? blog : favorite;
    };

    return blogs.reduce(reducer, 0);
};

const mostBlogs = (blogs) => {
    // totals contains counts for all authors
    // top contains the author (object) with the most blogs 
    const aggregate = ({totals, top}, {author}) => {
        totals[author] = totals[author] || 0;
        totals[author]++;
        if (totals[author] > top.blogs) top = {author, blogs: totals[author]};
        return({totals, top});
    };

    return blogs.reduce(aggregate, {totals: {}, top: {blogs: 0}}).top.author;
};

const mostLikes = (blogs) => {
    const accumulator = ({totals, top}, { author, likes }) => {
        totals[author] = totals[author] || 0; // 0 if author is not currently in totals
        totals[author] += likes;
        if (totals[author] > top.likes) top = {author, likes};
        return {totals, top};
    };

    return blogs.reduce(accumulator, {totals: {}, top: {likes: 0}}).top;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};