const apiKey = 'AIzaSyAH0LquoF4hPTYH4yy2raopLXT5fhU-xoo'; // استبدل بمفتاح API الخاص بك
const cx = '86ab2ac97164c4956'; // استبدل بـ CX الخاص بك

async function performSearch(query) {
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;

    try {
        const response = await fetch(searchUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayResults(data.items);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // تفريغ النتائج السابقة

    if (!results || results.length === 0) {
        resultsContainer.innerHTML = '<p>لم يتم العثور على نتائج.</p>';
        return;
    }

    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        const title = document.createElement('h3');
        title.textContent = item.title;
        resultItem.appendChild(title);

        const snippet = document.createElement('p');
        snippet.textContent = item.snippet;
        resultItem.appendChild(snippet);

        if (item.pagemap && item.pagemap.cse_image) {
            const img = document.createElement('img');
            img.src = item.pagemap.cse_image[0].src;
            img.alt = item.title;
            resultItem.appendChild(img);
        }

        const link = document.createElement('a');
        link.href = item.link;
        link.target = '_blank'; // فتح الرابط في علامة تبويب جديدة
        link.textContent = 'زيارة';
        resultItem.appendChild(link);

        resultsContainer.appendChild(resultItem);
    });
}

// حدث زر البحث
document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value;
    if (query) {
        performSearch(query);
    } else {
        alert('يرجى إدخال نص للبحث.');
    }
});
