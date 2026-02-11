// Arabic State Management Article - Comprehensive Guide (2500+ characters with code examples)

export const arStateManagementPost = {
    title: 'دليل شامل لإدارة الحالة في React: من useState إلى Redux و Zustand',
    slug: 'react-state-management-complete-guide-ar',
    tags: ['React', 'State Management', 'Redux', 'Zustand', 'Context API', 'JavaScript'],
    excerpt: 'دليل تفصيلي شامل لفهم إدارة الحالة في React، يشمل useState و useReducer و Context API و Redux و Zustand مع أمثلة عملية من مشاريع حقيقية.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    readingTime: 25,
    content: `<h2>مقدمة: ما هي إدارة الحالة ولماذا نحتاجها؟</h2>

<p>إدارة الحالة (State Management) هي واحدة من أهم المفاهيم في تطوير تطبيقات React. ببساطة، الحالة هي البيانات التي تتغير مع مرور الوقت وتؤثر على واجهة المستخدم. عندما يضغط المستخدم على زر، أو يكتب في حقل نص، أو يستلم التطبيق بيانات من الخادم، فإن هذه البيانات تُخزن في "الحالة" وتحدّث الواجهة تلقائياً.</p>

<p>تخيل تطبيق قائمة مهام: عندما تضيف مهمة جديدة، يجب أن تظهر فوراً في القائمة. هذا السلوك التفاعلي يعتمد كلياً على إدارة الحالة. React يعيد رسم (render) المكونات تلقائياً عند تغير حالتها، مما يخلق تجربة مستخدم سلسة وتفاعلية.</p>

<p>لكن لماذا نحتاج مكتبات خاصة لإدارة الحالة؟ مع نمو التطبيق، تصبح إدارة الحالة معقدة. قد تحتاج عدة مكونات متباعدة للوصول إلى نفس البيانات. بدون أداة مناسبة، ستجد نفسك تمرر البيانات عبر عشرات المستويات من المكونات (prop drilling)، مما يجعل الكود صعب الصيانة والفهم.</p>

<h2>الجزء الأول: إدارة الحالة المحلية باستخدام useState</h2>

<p>الـ useState هو الخطاف (Hook) الأساسي لإدارة الحالة المحلية في React. يتيح لك تخزين قيمة والحصول على دالة لتحديثها. عند تحديث الحالة، يعيد React رسم المكون ليعكس التغييرات الجديدة.</p>

<pre><code>// مثال بسيط على useState
import React, { useState } from 'react';

function Counter() {
    // تعريف حالة العداد مع قيمة ابتدائية 0
    const [count, setCount] = useState(0);
    
    // دالة لزيادة العداد
    const increment = () => {
        setCount(count + 1);
    };
    
    // دالة لإنقاص العداد
    const decrement = () => {
        setCount(count - 1);
    };
    
    return (
        &lt;div className="counter"&gt;
            &lt;h2&gt;العداد: {count}&lt;/h2&gt;
            &lt;button onClick={increment}&gt;زيادة +&lt;/button&gt;
            &lt;button onClick={decrement}&gt;إنقاص -&lt;/button&gt;
        &lt;/div&gt;
    );
}

export default Counter;</code></pre>

<p>في هذا المثال، useState(0) تُرجع مصفوفة من عنصرين: القيمة الحالية (count) ودالة التحديث (setCount). عند استدعاء setCount، يحدث React الحالة ويعيد رسم المكون.</p>

<h2>إدارة الحالة المعقدة مع useState</h2>

<p>يمكن استخدام useState مع أي نوع من البيانات، بما في ذلك الكائنات والمصفوفات. لكن يجب الانتباه لقاعدة مهمة: لا تعدّل الحالة مباشرة، بل أنشئ نسخة جديدة دائماً.</p>

<pre><code>// إدارة حالة معقدة - قائمة المهام
import React, { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    
    // إضافة مهمة جديدة
    const addTodo = () => {
        if (inputValue.trim() === '') return;
        
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };
        
        // إنشاء مصفوفة جديدة بدلاً من التعديل المباشر
        setTodos([...todos, newTodo]);
        setInputValue('');
    };
    
    // تبديل حالة الإكمال
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id 
                ? { ...todo, completed: !todo.completed }
                : todo
        ));
    };
    
    // حذف مهمة
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    
    return (
        &lt;div className="todo-app"&gt;
            &lt;div className="input-section"&gt;
                &lt;input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="أدخل مهمة جديدة..."
                /&gt;
                &lt;button onClick={addTodo}&gt;إضافة&lt;/button&gt;
            &lt;/div&gt;
            
            &lt;ul className="todo-list"&gt;
                {todos.map(todo => (
                    &lt;li 
                        key={todo.id}
                        className={todo.completed ? 'completed' : ''}
                    &gt;
                        &lt;span onClick={() => toggleTodo(todo.id)}&gt;
                            {todo.text}
                        &lt;/span&gt;
                        &lt;button onClick={() => deleteTodo(todo.id)}&gt;
                            حذف
                        &lt;/button&gt;
                    &lt;/li&gt;
                ))}
            &lt;/ul&gt;
        &lt;/div&gt;
    );
}

export default TodoList;</code></pre>

<h2>الجزء الثاني: useReducer للحالة المعقدة</h2>

<p>عندما تصبح منطق تحديث الحالة معقداً، يُفضل استخدام useReducer بدلاً من useState. هذا الخطاف مستوحى من مفهوم Redux ويوفر طريقة منظمة لإدارة تحديثات الحالة عبر "إجراءات" (actions) محددة.</p>

<pre><code>// استخدام useReducer لإدارة حالة معقدة
import React, { useReducer } from 'react';

// تعريف الحالة الابتدائية
const initialState = {
    todos: [],
    filter: 'all', // 'all' | 'active' | 'completed'
    loading: false,
    error: null
};

// دالة المُخفِّض (Reducer)
function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, {
                    id: Date.now(),
                    text: action.payload,
                    completed: false
                }]
            };
            
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            };
            
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(
                    todo => todo.id !== action.payload
                )
            };
            
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            };
            
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
            
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
            
        default:
            return state;
    }
}

function TodoApp() {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    
    // ترشيح المهام حسب الفلتر
    const filteredTodos = state.todos.filter(todo => {
        if (state.filter === 'active') return !todo.completed;
        if (state.filter === 'completed') return todo.completed;
        return true;
    });
    
    return (
        &lt;div className="todo-app"&gt;
            &lt;h1&gt;قائمة المهام&lt;/h1&gt;
            
            {/* أزرار الترشيح */}
            &lt;div className="filters"&gt;
                &lt;button 
                    onClick={() => dispatch({ 
                        type: 'SET_FILTER', 
                        payload: 'all' 
                    })}
                    className={state.filter === 'all' ? 'active' : ''}
                &gt;
                    الكل
                &lt;/button&gt;
                &lt;button 
                    onClick={() => dispatch({ 
                        type: 'SET_FILTER', 
                        payload: 'active' 
                    })}
                    className={state.filter === 'active' ? 'active' : ''}
                &gt;
                    النشطة
                &lt;/button&gt;
                &lt;button 
                    onClick={() => dispatch({ 
                        type: 'SET_FILTER', 
                        payload: 'completed' 
                    })}
                    className={state.filter === 'completed' ? 'active' : ''}
                &gt;
                    المكتملة
                &lt;/button&gt;
            &lt;/div&gt;
            
            {/* عرض المهام */}
            &lt;ul&gt;
                {filteredTodos.map(todo => (
                    &lt;li key={todo.id}&gt;
                        &lt;span 
                            onClick={() => dispatch({ 
                                type: 'TOGGLE_TODO', 
                                payload: todo.id 
                            })}
                            style={{
                                textDecoration: todo.completed 
                                    ? 'line-through' 
                                    : 'none'
                            }}
                        &gt;
                            {todo.text}
                        &lt;/span&gt;
                        &lt;button onClick={() => dispatch({ 
                            type: 'DELETE_TODO', 
                            payload: todo.id 
                        })}&gt;
                            ✕
                        &lt;/button&gt;
                    &lt;/li&gt;
                ))}
            &lt;/ul&gt;
        &lt;/div&gt;
    );
}

export default TodoApp;</code></pre>

<p>ميزة useReducer هي فصل منطق تحديث الحالة عن المكون نفسه. الـ reducer دالة نقية يسهل اختبارها بشكل مستقل. كما أن استخدام الإجراءات (actions) يجعل تتبع التغييرات أسهل.</p>

<h2>الجزء الثالث: Context API لمشاركة الحالة</h2>

<p>Context API هي آلية React المدمجة لمشاركة البيانات عبر شجرة المكونات دون الحاجة لتمرير props يدوياً. تتكون من ثلاثة أجزاء: Context نفسه، Provider الذي يوفر القيمة، و Consumer أو useContext للوصول إليها.</p>

<pre><code>// إنشاء Context لإدارة المصادقة
import React, { createContext, useContext, useState, useEffect } from 'react';

// إنشاء السياق
const AuthContext = createContext(null);

// مكون Provider
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // التحقق من جلسة المستخدم عند تحميل التطبيق
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    const response = await fetch('/api/auth/verify', {
                        headers: { Authorization: \`Bearer \${token}\` }
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    }
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setLoading(false);
            }
        };
        
        checkAuth();
    }, []);
    
    // دالة تسجيل الدخول
    const login = async (email, password) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        if (!response.ok) {
            throw new Error('فشل تسجيل الدخول');
        }
        
        const { user, token } = await response.json();
        localStorage.setItem('authToken', token);
        setUser(user);
        return user;
    };
    
    // دالة تسجيل الخروج
    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };
    
    // القيمة المُقدمة للسياق
    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    };
    
    return (
        &lt;AuthContext.Provider value={value}&gt;
            {children}
        &lt;/AuthContext.Provider&gt;
    );
}

// Hook مخصص للوصول للسياق
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

// استخدام السياق في مكون
function ProfilePage() {
    const { user, logout, loading } = useAuth();
    
    if (loading) {
        return &lt;div&gt;جاري التحميل...&lt;/div&gt;;
    }
    
    if (!user) {
        return &lt;div&gt;يرجى تسجيل الدخول&lt;/div&gt;;
    }
    
    return (
        &lt;div className="profile"&gt;
            &lt;h2&gt;مرحباً، {user.name}&lt;/h2&gt;
            &lt;p&gt;البريد: {user.email}&lt;/p&gt;
            &lt;button onClick={logout}&gt;تسجيل الخروج&lt;/button&gt;
        &lt;/div&gt;
    );
}

export default ProfilePage;</code></pre>

<h2>الجزء الرابع: Redux - إدارة الحالة على مستوى التطبيق</h2>

<p>Redux هي المكتبة الأكثر شهرة لإدارة الحالة في تطبيقات React الكبيرة. تعتمد على مبادئ ثلاثة: مخزن واحد للحالة (Single Source of Truth)، الحالة للقراءة فقط (State is Read-Only)، والتغييرات تتم عبر دوال نقية (Changes are Made with Pure Functions).</p>

<pre><code>// إعداد Redux Toolkit - الطريقة الحديثة
// store/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk لجلب بيانات السلة من الخادم
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (userId) => {
        const response = await fetch(\`/api/cart/\${userId}\`);
        return response.json();
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
        loading: false,
        error: null
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(
                item => item.id === action.payload.id
            );
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ 
                    ...action.payload, 
                    quantity: 1 
                });
            }
            
            // حساب المجموع
            state.total = state.items.reduce(
                (sum, item) => sum + item.price * item.quantity, 
                0
            );
        },
        
        removeItem: (state, action) => {
            state.items = state.items.filter(
                item => item.id !== action.payload
            );
            state.total = state.items.reduce(
                (sum, item) => sum + item.price * item.quantity, 
                0
            );
        },
        
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            
            if (item && quantity > 0) {
                item.quantity = quantity;
                state.total = state.items.reduce(
                    (sum, item) => sum + item.price * item.quantity, 
                    0
                );
            }
        },
        
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { addItem, removeItem, updateQuantity, clearCart } = 
    cartSlice.actions;
export default cartSlice.reducer;

// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer
    }
});

// استخدام Redux في المكونات
// components/Cart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../store/slices/cartSlice';

function Cart() {
    const { items, total, loading } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    
    if (loading) {
        return &lt;div className="loading"&gt;جاري تحميل السلة...&lt;/div&gt;;
    }
    
    if (items.length === 0) {
        return &lt;div className="empty-cart"&gt;السلة فارغة&lt;/div&gt;;
    }
    
    return (
        &lt;div className="cart"&gt;
            &lt;h2&gt;سلة التسوق&lt;/h2&gt;
            
            &lt;ul className="cart-items"&gt;
                {items.map(item => (
                    &lt;li key={item.id} className="cart-item"&gt;
                        &lt;img src={item.image} alt={item.name} /&gt;
                        &lt;div className="item-details"&gt;
                            &lt;h3&gt;{item.name}&lt;/h3&gt;
                            &lt;p&gt;السعر: {item.price} ر.س&lt;/p&gt;
                        &lt;/div&gt;
                        &lt;div className="quantity-controls"&gt;
                            &lt;button onClick={() => dispatch(updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1
                            }))}&gt;-&lt;/button&gt;
                            &lt;span&gt;{item.quantity}&lt;/span&gt;
                            &lt;button onClick={() => dispatch(updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1
                            }))}&gt;+&lt;/button&gt;
                        &lt;/div&gt;
                        &lt;button 
                            className="remove-btn"
                            onClick={() => dispatch(removeItem(item.id))}
                        &gt;
                            حذف
                        &lt;/button&gt;
                    &lt;/li&gt;
                ))}
            &lt;/ul&gt;
            
            &lt;div className="cart-footer"&gt;
                &lt;p className="total"&gt;المجموع: {total} ر.س&lt;/p&gt;
                &lt;button onClick={() => dispatch(clearCart())}&gt;
                    إفراغ السلة
                &lt;/button&gt;
                &lt;button className="checkout-btn"&gt;
                    إتمام الشراء
                &lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    );
}

export default Cart;</code></pre>

<h2>الجزء الخامس: Zustand - البديل الخفيف والحديث</h2>

<p>Zustand هي مكتبة حديثة لإدارة الحالة تتميز بالبساطة والخفة. لا تحتاج providers ولا boilerplate كثير. تستخدم hooks بشكل مباشر وتدعم middleware مثل persist و devtools.</p>

<pre><code>// إنشاء store باستخدام Zustand
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// متجر إدارة المنتجات
const useProductStore = create(
    devtools(
        persist(
            (set, get) => ({
                // الحالة
                products: [],
                categories: [],
                selectedCategory: null,
                searchQuery: '',
                loading: false,
                error: null,
                
                // الإجراءات
                fetchProducts: async () => {
                    set({ loading: true, error: null });
                    try {
                        const response = await fetch('/api/products');
                        const products = await response.json();
                        set({ products, loading: false });
                    } catch (error) {
                        set({ 
                            error: error.message, 
                            loading: false 
                        });
                    }
                },
                
                fetchCategories: async () => {
                    const response = await fetch('/api/categories');
                    const categories = await response.json();
                    set({ categories });
                },
                
                setSelectedCategory: (category) => {
                    set({ selectedCategory: category });
                },
                
                setSearchQuery: (query) => {
                    set({ searchQuery: query });
                },
                
                // Computed values باستخدام get()
                getFilteredProducts: () => {
                    const state = get();
                    let filtered = state.products;
                    
                    if (state.selectedCategory) {
                        filtered = filtered.filter(
                            p => p.category === state.selectedCategory
                        );
                    }
                    
                    if (state.searchQuery) {
                        const query = state.searchQuery.toLowerCase();
                        filtered = filtered.filter(
                            p => p.name.toLowerCase().includes(query)
                        );
                    }
                    
                    return filtered;
                }
            }),
            {
                name: 'product-store', // اسم المفتاح في localStorage
                partialize: (state) => ({ 
                    selectedCategory: state.selectedCategory 
                }) // حفظ جزء محدد فقط
            }
        )
    )
);

// متجر سلة التسوق منفصل
const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            
            addToCart: (product) => {
                set((state) => {
                    const existing = state.items.find(
                        item => item.id === product.id
                    );
                    
                    if (existing) {
                        return {
                            items: state.items.map(item =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            )
                        };
                    }
                    
                    return {
                        items: [...state.items, { ...product, quantity: 1 }]
                    };
                });
            },
            
            removeFromCart: (productId) => {
                set((state) => ({
                    items: state.items.filter(item => item.id !== productId)
                }));
            },
            
            getTotal: () => {
                return get().items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );
            },
            
            getItemCount: () => {
                return get().items.reduce(
                    (count, item) => count + item.quantity,
                    0
                );
            }
        }),
        { name: 'cart-store' }
    )
);

// استخدام Zustand في المكونات
function ProductList() {
    const { 
        loading, 
        error, 
        getFilteredProducts,
        fetchProducts,
        setSearchQuery,
        searchQuery
    } = useProductStore();
    
    const { addToCart } = useCartStore();
    
    useEffect(() => {
        fetchProducts();
    }, []);
    
    const products = getFilteredProducts();
    
    if (loading) return &lt;div&gt;جاري التحميل...&lt;/div&gt;;
    if (error) return &lt;div&gt;خطأ: {error}&lt;/div&gt;;
    
    return (
        &lt;div className="products-page"&gt;
            &lt;input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن منتج..."
            /&gt;
            
            &lt;div className="products-grid"&gt;
                {products.map(product => (
                    &lt;div key={product.id} className="product-card"&gt;
                        &lt;img src={product.image} alt={product.name} /&gt;
                        &lt;h3&gt;{product.name}&lt;/h3&gt;
                        &lt;p&gt;{product.price} ر.س&lt;/p&gt;
                        &lt;button onClick={() => addToCart(product)}&gt;
                            أضف للسلة
                        &lt;/button&gt;
                    &lt;/div&gt;
                ))}
            &lt;/div&gt;
        &lt;/div&gt;
    );
}

// مكون عربة التسوق المصغرة
function MiniCart() {
    const itemCount = useCartStore(state => state.getItemCount());
    const total = useCartStore(state => state.getTotal());
    
    return (
        &lt;div className="mini-cart"&gt;
            🛒 &lt;span&gt;{itemCount}&lt;/span&gt;
            &lt;span&gt;{total} ر.س&lt;/span&gt;
        &lt;/div&gt;
    );
}

export { useProductStore, useCartStore };</code></pre>

<h2>متى تستخدم كل أداة؟</h2>

<p>اختيار أداة إدارة الحالة يعتمد على حجم التطبيق ومتطلباته:</p>

<p><strong>useState:</strong> استخدمه للحالة المحلية البسيطة داخل مكون واحد. مثال: التحكم في فتح/إغلاق قائمة، قيمة حقل إدخال، حالة تحميل محلية.</p>

<p><strong>useReducer:</strong> استخدمه عندما يكون منطق تحديث الحالة معقداً أو عندما تعتمد التحديثات على الحالة السابقة. مفيد للنماذج المعقدة أو الحالة التي تتضمن عدة حقول مترابطة.</p>

<p><strong>Context API:</strong> استخدمها لمشاركة بيانات لا تتغير كثيراً عبر مكونات متعددة. مثالية لـ: السمة (theme)، اللغة، بيانات المستخدم المسجل. تجنبها للبيانات التي تتغير بشكل متكرر لأنها تسبب إعادة رسم غير ضرورية.</p>

<p><strong>Redux:</strong> استخدمه للتطبيقات الكبيرة ذات الحالة المعقدة التي تحتاج تتبعاً دقيقاً. Redux DevTools ممتازة للـ debugging. مناسب عندما يحتاج فريق كبير للعمل على نفس الكود لأنه يفرض هيكلاً واضحاً.</p>

<p><strong>Zustand:</strong> استخدمه كبديل أخف لـ Redux. مثالي للتطبيقات المتوسطة أو عندما تريد البساطة مع القوة. لا يحتاج providers ولا boilerplate كثير. يدعم middleware ويعمل بشكل ممتاز مع TypeScript.</p>

<h2>نصائح عملية لإدارة الحالة الفعالة</h2>

<p>أولاً، لا تبالغ في رفع الحالة. ابدأ بالحالة المحلية وارفعها فقط عند الحاجة. الحالة يجب أن تكون قريبة من المكونات التي تستخدمها.</p>

<p>ثانياً، افصل الحالة حسب المجال. بدلاً من store ضخم واحد، استخدم stores متعددة مخصصة (مثل: authStore, cartStore, productsStore).</p>

<p>ثالثاً، استخدم selectors لتحسين الأداء. اختر الحقول المحددة التي تحتاجها بدلاً من الاشتراك في كل الحالة.</p>

<p>رابعاً، تعامل مع الحالة بشكل immutable دائماً. استخدم spread operator أو مكتبات مثل Immer لإنشاء نسخ جديدة.</p>

<p>خامساً، استخدم DevTools للتصحيح. سواء Redux DevTools أو Zustand devtools middleware، هذه الأدوات تسهل فهم تدفق البيانات وتتبع الأخطاء.</p>

<h2>الخلاصة</h2>

<p>إدارة الحالة في React موضوع واسع ومهم. ابدأ بالأساسيات (useState و useReducer)، افهم Context API جيداً، ثم انتقل لمكتبات خارجية عند الحاجة. لا توجد أداة "أفضل" مطلقة - الأفضل هو ما يناسب متطلبات مشروعك وحجم فريقك. الأهم هو الاتساق في الاستخدام وفهم المبادئ الأساسية وراء كل أداة.</p>`
};
