class Payment {
    constructor(amount, date) {
        this.amount = amount;
        this.date = date;
    }

    pay() {
        return `Please use Credit card, PayPal or Crypto for transactions`;
    }
}

class CreditCardPayment extends Payment {
    constructor(amount, date, cardNumber) {
        super(amount, date);
        this.#cardNumber = cardNumber;
    }
    #cardNumber;
    pay() {
        return `Debited ${this.amount} from your Credit card account on ${this.date}`;
    }
}

class PayPalPayment extends Payment {
    constructor(amount, date, email) {
        super(amount, date);
        this.#paypalemail = email;
    }
    #paypalemail
    pay() {
        return `Debited ${this.amount} from your PayPal account on ${this.date}`;
    }
}

class CryptoPayment extends Payment {
    constructor(amount, date, walletAddress) {
        super(amount, date);
        this.#walletAddress = walletAddress;
        this.#balance = 100000;
    }
    #balance;
    #walletAddress;

    pay() {
        return `Debited ${this.amount} from your Crypto account on ${this.date}`;
    }
}
const payment = new Payment(250, "2025-01-01")
const creditCardPayment = new CreditCardPayment(350, "2025-02-04", "1234-5678-9012-3456");
const payPalPayment = new PayPalPayment(700, "2025-02-03", "abcd@gmail.com");
const cryptoPayment = new CryptoPayment(1080, "2025-02-02", "0xdsankjdbabiksadasda");

console.log(creditCardPayment.pay());
console.log(payPalPayment.pay());
console.log(cryptoPayment.pay());
