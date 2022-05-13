## Note:
Open `src/services/setupInterceptors.js` and modify `config.headers` for appropriate back-end 

```js
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

# bioartbot-dashboard
