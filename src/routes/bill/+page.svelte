<script>
  import { cart, clearCart } from '$lib/stores/cart';
  import { sales } from '$lib/stores/sales';

  const date = new Date();
  const orderNo = Math.floor(Math.random() * 100000);

  $: total = $cart.reduce((s, ci) => s + ci.item.price * ci.qty, 0);

  function printBill() {
    sales.addSale(total, date);
    window.print();
    clearCart();
  }
</script>

<div class="receipt">
  <h1 class="title">TWILIGHT RESTAURANT</h1>
  <p class="center">Jodemetla

  </p>

  <hr />

  <p>Order No: {orderNo}</p>
  <p>Date: {date.toLocaleDateString()}</p>
  <p>Time: {date.toLocaleTimeString()}</p>

  <hr />

  <div class="items">
    {#each $cart as ci}
      <div class="row">
        <span>{ci.item.name} x{ci.qty}</span>
        <span>₹{ci.item.price * ci.qty}</span>
      </div>
    {/each}
  </div>

  <hr />

  <div class="row total">
    <span>Total</span>
    <span>₹{total}</span>
  </div>

  <hr />

  <p class="center">Thank You 🙏</p>
</div>

<button class="print-btn" on:click={printBill}>
  🖨 Print Bill
</button>
<style>
/* SCREEN */
.receipt {
  width: 280px; /* 58mm printer */
  font-family: monospace;
  font-size: 12px;
  margin: auto;
}

.title {
  text-align: center;
  font-weight: bold;
  font-size: 16px;
}

.center {
  text-align: center;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
}

.total {
  font-weight: bold;
}

hr {
  border: none;
  border-top: 1px dashed black;
  margin: 6px 0;
}

.print-btn {
  margin-top: 20px;
  padding: 10px;
}

/* PRINT MODE */
@media print {
  body * {
    visibility: hidden;
  }

  .receipt,
  .receipt * {
    visibility: visible;
  }

  .receipt {
    position: absolute;
    left: 0;
    top: 0;
  }

  .print-btn {
    display: none;
  }
}
</style>
