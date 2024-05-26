function generateSEOTitle(subcategory_name) {

    const seoTitle = subcategory_name.toLowerCase().replace(/\s+/g, '-');
    const cleanedTitle = seoTitle.replace(/[^a-z0-9-]/g, '');

    return cleanedTitle;
}

module.exports =  { generateSEOTitle }