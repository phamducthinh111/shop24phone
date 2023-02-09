import { LOAD_ALL_PRODUCTS,
        PRODUCT_PAGE_CHANGE,
        FILTER_NAME_DENTAIL_PRODUCT,
        FILTER_PRODUCTS,
        FILTER_PRICE_DENTAIL_PRODUCT,
        FILTER_TYPE_DENTAIL_PRODUCT,
        DISPLAY_PRODUCT_DENTAIL,
        ADD_PRODUCT_IN_CARD,
        DELETED_PRODUCT_IN_CARD,
        INCREASE_QUANTITY,
        REDUCTINON_QUANTITY,
        GET_USERS_GOOGLE_ACCOUNT,
        DISPLAY_MODAL_DETAIL_ORDER_CUSTOMER
        } from "../Constans/shop24h.Constan";


export const loadProductList = (page, limit) => {
    return(
        async (dispatch) => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            try {
                const responseProductList = await fetch(`http://localhost:8002/api/Product/`, requestOptions);
                const dataProductList = await responseProductList.json();

                const response = await fetch(`http://localhost:8002/api/Product/?limit=${limit}&page=${page}`, requestOptions);
                const data = await response.json();
                return dispatch ({
                    type: LOAD_ALL_PRODUCTS,
                    totalUser: dataProductList.data.length,
                    payload: data
                })
            } catch(error) {
                console.log(error)
            } 
        }    
    )  
}
export const pageChangePagination = (page) => {
    return {
        type: PRODUCT_PAGE_CHANGE,
        page: page
    }
}
export const filterNameProduct = (name) => {
    return {
        type: FILTER_NAME_DENTAIL_PRODUCT,
        payload: name
    }
}
export const filterMinPriceProduct = (price) => {
    return {
        type: FILTER_PRICE_DENTAIL_PRODUCT,
        payload: price
    }
}
export const filterTypeProduct = (type) => {
    return {
        type: FILTER_TYPE_DENTAIL_PRODUCT,
        payload: type
    }
}
export const filterProduct = (data) => {
    return {
        type: FILTER_PRODUCTS,
        payload: data
    }
}
export const displayProductDentail = (proDuct) => {
    return {
        type: DISPLAY_PRODUCT_DENTAIL,
        payload: proDuct
    }
}
export const handleProductCard = (card) => {
    return {
        type: ADD_PRODUCT_IN_CARD,
        payload: card
    }
}
export const increaseQuantity = (id) => {
    return {
        type: INCREASE_QUANTITY,
        payload: id
    }
}
export const reductionQuantity = (id) => {
    return {
        type: REDUCTINON_QUANTITY,
        payload: id
    }
}
export const deletedProductInCard = (id) => {
    return {
        type: DELETED_PRODUCT_IN_CARD,
        payload: id
    }
}
export const getAccountGoogle = (account) => {
    return {
        type: GET_USERS_GOOGLE_ACCOUNT,
        payload: account
    }
}
export const openModalDentailOrderCustomer = (order) => {
    return {
        type: DISPLAY_MODAL_DETAIL_ORDER_CUSTOMER,
        payload: order
    }
}
