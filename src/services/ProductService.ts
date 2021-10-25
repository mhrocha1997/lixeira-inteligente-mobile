import api from './api';

export async function getCatalog(token: string){
    const response = await api.get('/products',
        {'headers': {
            'Authorization': `Bearer ${token}`
        }}
    );

    if (response.status == 200){
        return response.data.found.products;
    }
    return [];
}

export async function createProduct(token: string, data: Object){
    const response = await api.post('/products', data,
        {'headers': {
            'Authorization': `Bearer ${token}`,
        }}
    );
    if (response.status == 201){
        return true;
    }
    return false;
}

export async function getProductByCode(token: string, code: string){
    const url = `/products/code/${code}`;
    const response = await api.get(url,
        {'headers': {
            'Authorization': `Bearer ${token}`,
    }});
    if (response.status == 200){
        return response.data.product.id;
    }
    return false;

}