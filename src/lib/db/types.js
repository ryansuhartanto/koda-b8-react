/**
 * @typedef {"pending" | "packed" | "shipped" | "delivered" | "cancelled"} OrderStatus
 */

/**
 * @typedef CartItem
 * @property {string} productName
 * @property {number} quantity
 */

/**
 * @typedef OrderItem
 * @property {string} productName
 * @property {number} quantity
 * @property {number} price
 */

/**
 * @typedef ShippingInfo
 * @property {string} name
 * @property {string} phone
 * @property {string} email
 * @property {string} address
 * @property {string} city
 * @property {string} province
 * @property {string} postalCode
 * @property {string} note
 * @property {string} method
 * @property {number} cost
 */

/**
 * @typedef Order
 * @property {string} id
 * @property {string} createdAt
 * @property {OrderStatus} status
 * @property {OrderItem[]} items
 * @property {ShippingInfo} shipping
 * @property {string} paymentMethod
 * @property {string} [promoCode]
 * @property {number} discount
 * @property {number} subtotal
 * @property {number} total
 */

/**
 * @typedef Address
 * @prop {string} id
 * @prop {string} label
 * @prop {string} name
 * @prop {string} phone
 * @prop {string} address
 * @prop {string} city
 * @prop {string} province
 * @prop {string} postalCode
 * @prop {boolean} isDefault
 */

/**
 * @typedef SavedPayment
 * @prop {string} id
 * @prop {string} type
 * @prop {boolean} isDefault
 */

/**
 * @typedef User
 * @prop {string} id
 * @prop {string} name
 * @prop {string} email
 * @prop {string} passwordHash
 * @prop {string} [phone]
 * @prop {string} [birthdate]
 * @prop {"M" | "F" | "X"} [gender]
 * @prop {string} [avatar]
 * @prop {string} createdAt
 * @prop {CartItem[]} cart
 * @prop {string[]} wishlist
 * @prop {Order[]} orders
 * @prop {Address[]} addresses
 * @prop {SavedPayment[]} savedPayments
 */

/* oxlint-disable-next-line unicorn/require-module-specifiers */
export {};
