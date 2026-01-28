// Automatically add target="_blank" and rel="noopener noreferrer" to external links
(function() {
    function addExternalLinkAttributes() {
        const links = document.querySelectorAll('a[href]');
        const currentHost = window.location.hostname;
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Check if it's an external link (starts with http:// or https://)
            // and doesn't point to the same domain
            if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
                try {
                    const url = new URL(href);
                    // If it's a different hostname, it's external
                    if (url.hostname !== currentHost && url.hostname !== '') {
                        link.setAttribute('target', '_blank');
                        link.setAttribute('rel', 'noopener noreferrer');
                    }
                } catch (e) {
                    // If URL parsing fails, assume it's external if it starts with http/https
                    link.setAttribute('target', '_blank');
                    link.setAttribute('rel', 'noopener noreferrer');
                }
            }
        });
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addExternalLinkAttributes);
    } else {
        addExternalLinkAttributes();
    }
})();
