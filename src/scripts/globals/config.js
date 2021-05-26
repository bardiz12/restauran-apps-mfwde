const CONFIG = {
    BASE_URL: 'https://restaurant-api.dicoding.dev/',
    BASE_IMAGE_URL: {
        small: 'https://restaurant-api.dicoding.dev/images/small/',
        medium: 'https://restaurant-api.dicoding.dev/images/medium/',
        large: 'https://restaurant-api.dicoding.dev/images/large/',
    },
    DEFAULT_LANGUAGE: 'en-us',
    generateImageUrlObject(pictureId) {
        return {
            small: `${this.BASE_IMAGE_URL.small}${pictureId}`,
            medium: `${this.BASE_IMAGE_URL.medium}${pictureId}`,
            large: `${this.BASE_IMAGE_URL.large}${pictureId}`,
        };
    },
};

export default CONFIG;
