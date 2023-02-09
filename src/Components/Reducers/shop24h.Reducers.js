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
        DISPLAY_MODAL_DETAIL_ORDER_CUSTOMER,
        } from "../Constans/shop24h.Constan";

const initialState = {
    productList:  [],
    nameProduct: "",
    limit: 8,
    page: 0,
    currentPage: 1,
    minPrice: 1000000,
    maxPrice: 50000000,
    typeProduct: "",
    productDentail: {},
    card: [],
    accountGoogle: {},
    orderCustomer: {}
}

const shop24hReduces = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_PRODUCTS:
                state.productList = action.payload.data;
                state.page = Math.ceil(action.totalUser / state.limit)
                
            break;
        case PRODUCT_PAGE_CHANGE:
                state.currentPage = action.page
            break;
        case FILTER_NAME_DENTAIL_PRODUCT:
                state.nameProduct = action.payload
            break;

        case FILTER_PRODUCTS:
                state.productList = action.payload
            break;
        case FILTER_PRICE_DENTAIL_PRODUCT:
                state.minPrice = action.payload.min
                state.maxPrice = action.payload.max
            break;
        case FILTER_TYPE_DENTAIL_PRODUCT:
                state.typeProduct = action.payload
            break;
        case DISPLAY_PRODUCT_DENTAIL:
                state.productDentail = action.payload
            break;
        case ADD_PRODUCT_IN_CARD:
            // lọc phần tử trùng lặp
            state.card = ([
                ...state.card,
                action.payload             
            ]).filter((value, index, self) => {
                return ( index === self.findIndex((item) => (
                    item._id === value._id
                  ))
                  )
            })
     
            break;
        case INCREASE_QUANTITY:
                const index1 = state.card.findIndex(item => item._id === action.payload)
                state.card[index1].amount ++
            break;
        case REDUCTINON_QUANTITY:
                const index2 = state.card.findIndex(item => item._id === action.payload)
                state.card[index2].amount --
            break;
        case DELETED_PRODUCT_IN_CARD:
                const deletedProduct = state.card.filter((item) => item._id !== action.payload)
                //console.log(deletedProduct)
                state.card = deletedProduct
            break;
        case GET_USERS_GOOGLE_ACCOUNT:
                state.accountGoogle = action.payload
            break;
        case DISPLAY_MODAL_DETAIL_ORDER_CUSTOMER:
                state.orderCustomer = action.payload
            break;

    }
    return {...state}
}

export default shop24hReduces