export const categories = [
    {
        name:'cars',
        image:'https://i.pinimg.com/564x/db/80/d4/db80d46e9384ac61f7c19f01392e1ac6.jpg'
    },
    {
        name:'fitness',
        image:'https://i.pinimg.com/564x/db/80/d4/db80d46e9384ac61f7c19f01392e1ac6.jpg'
    },
    {
        name:'wallpaper',
        image:'https://i.pinimg.com/564x/db/80/d4/db80d46e9384ac61f7c19f01392e1ac6.jpg'
    },
    {
        name:'websites',
        image:'https://i.pinimg.com/564x/db/80/d4/db80d46e9384ac61f7c19f01392e1ac6.jpg'
    },
    {
        name:'photo',
        image:'https://i.pinimg.com/564x/db/80/d4/db80d46e9384ac61f7c19f01392e1ac6.jpg'
    },
    {
        name:'food',
        image:'https://i.pinimg.com/564x/db/80/d4/db80d46e9384ac61f7c19f01392e1ac6.jpg'
    },
    {
        name:'nature',
        image:'https://i.pinimg.com/564x/db/80/d4/db80d46e9384ac61f7c19f01392e1ac6.jpg'
    },
    {
        name:'art',
        image:'https://i.pinimg.com/564x/db/80/d4/db80d46e9384ac61f7c19f01392e1ac6.jpg'
    },
    {
        name:'travel',
        image:'https://i.pinimg.com/564x/db/80/d4/db80d46e9384ac61f7c19f01392e1ac6.jpg'
    },
    {
        name:'quotes',
        image:'https://i.pinimg.com/564x/db/80/d4/db80d46e9384ac61f7c19f01392e1ac6.jpg'
    },
    {
        name:'cats',
        image:'https://i.pinimg.com/564x/db/80/d4/db80d46e9384ac61f7c19f01392e1ac6.jpg'
    },
    {
        name:'dogs',
        image:'https://i.pinimg.com/564x/db/80/d4/db80d46e9384ac61f7c19f01392e1ac6.jpg'
    },
    {
        name:'others',
        image:'https://i.pinimg.com/564x/db/80/d4/db80d46e9384ac61f7c19f01392e1ac6.jpg'
    },
]

export const userQuery = (userId)=>{
    const query = `*[_type=='user' && _id=='${userId}']`;

    return query
}

export const searchQuery = (searchTerm) =>{
    const query = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
            asset->{
                url
            }
        },
        _id,
        destination,
        postedBy ->{
            _id,
            userName,
            image
        },
        save[]{
            _key,
            postedBy->{
                _id,
                userName,
                image
            },
        },
    }`
    return query
}

export const feedQuery = `*[_type == 'pin']| order(_createAt desc){
    image{
        asset->{
            url
        }
    },
    _id,
    destination,
    postedBy ->{
        _id,
        userName,
        image
    },
    save[]{
        _key,
        postedBy->{
            _id,
            userName,
            image
        },
    },
}`