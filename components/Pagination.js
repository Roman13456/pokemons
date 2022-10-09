const createPagination = (quantity = 5) => {
    const pages = [];
    for (let i = 1; i <= quantity; i++) {
        pages.push(`<li><button data-page=${i} class='page ${i==1?'activePage':''}'>${i}</button></li>`);
    }
    return `${pages.join("")}`;
};

