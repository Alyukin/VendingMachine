import React, { useState } from 'react';

const Products = [
  {id: 1, name: 'Matcha Latte', price: 150, stock: 5, icon: '🍵', color: 'bg-green-100'},
  {id: 2, name: 'Mocha Coffe', price: 120, stock: 3, icon: '☕', color: 'bg-orange-100'},
  {id: 3, name: 'Peach Soda', price: 90, stock: 8, icon: '🍑', color: 'bg-pink-100'},
  {id: 4, name: 'Onigiri', price: 200, stock: 4, icon: '🍙', color: 'bg-slate-100'},
  {id: 5, name: 'Dango', price: 150, stock: 6, icon: '🍡', color: 'bg-green-100'},
  {id: 6, name: 'Chocolate Bar', price: 150, stock: 10, icon: '🍫', color: 'bg-amber-100'},
]

export default function ComfyVendingMachine() {
  /* Инициализация значений */
  const [products, set_products] = useState(Products)
  const [balance, set_balance] = useState(500)
  const [dbLog, set_dbLog] = useState([{ msg: 'System online'}]);
  const [isOn, set_isOn] = useState(false);

  const add_Log = (msg) => {
    set_dbLog(prev => [{ msg, time: new Date().toLocaleTimeString()}]);
  };

  const buy = (product) => {
    if (isOn || balance < product.price || balance <= 0) {
      if (balance < product.price) add_Log("Low balance!")
        return;
    };

    set_isOn(true);
    add_Log(`purchase item(${product.id})`);

    setTimeout(() => {
      /* Проходим по каждому
       id совпал -> создаём копию, уменьшая stock
       не совпал -> возвращаем без изменений
      */
      set_products(prev => prev.map(p => p.id === product.id ? {...p, stock: p.stock - 1} : p
      ));
      set_balance(prev => prev - product.price);
      set_isOn(false);
    }, 600);
  };

  
  return (
        <div className="flex bg-sky-400 p-6 gap-6">
          
      {/* Выбор продукта (список) */}
      <div className="flex-1 flex">
        <div className="bg-white/90 rounded-3xl p-6 flex-1 flex flex-col">
          <h2 className="text-xl font-black mb-6 text-sky-600">
            MENU
          </h2>
          
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {products.map(product => (
              <div 
                key={product.id}
                className={`flex items-center p-3 border-2 transition-all ${product.stock > 0 ? 'border-sky-50 bg-white hover:border-sky-300' : 'opacity-50 grayscale border-transparent bg-slate-100'}`}
              >
                <div className={`w-12 h-12 ${product.color} flex items-center justify-center text-2xl mr-4`}>
                  {product.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{product.name}</h3>
                  <p className="text-xs text-slate-500">Stock: {product.stock}</p>
                </div>
                <button 
                  onClick={() => buy(product)}
                  disabled={isOn || product.stock === 0}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 text-sm font-bold active:scale-95 disabled:bg-slate-300 transition-colors"
                >{product.price} ₽</button>
              </div>
            ))}
          </div>

          {/* Баланс */}
          <div className="mt-6 pt-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[15px] text-sky-400 font-bold uppercase">Wallet</p>
                <p className="text-3xl font-black text-sky-600">{balance} ₽</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Правая часть: Логи & Операции & Время */}
      <div className="w-80 bg-slate-900 rounded-3xl p-5 flex flex-col">
        <span className="mb-4ml-2 text-[10px] text-slate-500 font-bold tracking-widest">MONITOR</span>
        <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px]">
          {dbLog.map((log, i) => (
            <div key={i} className="p-2 rounded border-l-2 bg-white/10 border-green-500 text-green-400">
              <div className="opacity-40 mb-1">{log.time}</div>
              <div>{log.msg}</div>
            </div>
          ))}
          {isOn && <div className="text-sky-500">EXECUTING TRANSACTION...</div>}
        </div>
      </div>
    </div>
  )
}