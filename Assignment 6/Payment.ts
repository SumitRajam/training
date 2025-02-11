/*
## Online Payment System

    Create Payment class with amount, date.
    Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
    Abstraction: Hide sensitive details like private cardNumber.
*/

abstract class Payment {
    protected amount: number;
    protected date: string;

    constructor(amount: number, date: string) {
        this.amount = amount;
        this.date = date;
    }

    // Abstract method to be implemented in subclasses
    abstract pay(): string;
}

class CreditCardPayment extends Payment {
    private cardNumber: string;

    constructor(amount: number, date: string, cardNumber: string) {
        super(amount, date);
        this.cardNumber = cardNumber;
    }

    pay(): string {
        return `Debited ${this.amount} from your Credit Card account on ${this.date}`;
    }
}

class PayPalPayment extends Payment {
    private paypalEmail: string;

    constructor(amount: number, date: string, email: string) {
        super(amount, date);
        this.paypalEmail = email;
    }

    pay(): string {
        return `Debited ${this.amount} from your PayPal account on ${this.date}`;
    }
}

class CryptoPayment extends Payment {
    private balance: number;
    private walletAddress: string;

    constructor(amount: number, date: string, walletAddress: string) {
        super(amount, date);
        this.walletAddress = walletAddress;
        this.balance = 100000;
    }

    pay(): string {
        return `Debited ${this.amount} from your Crypto account on ${this.date}`;
    }
}

// Creating instances
const creditCardPayment: Payment = new CreditCardPayment(350, "2025-02-11", "1234-5678-9012-3456");
const payPalPayment: Payment = new PayPalPayment(700, "2025-02-11", "abcd@gmail.com");
const cryptoPayment: Payment = new CryptoPayment(1080, "2025-02-11", "0xdsankjdbabiksadasda");


console.log(creditCardPayment.pay());
console.log(payPalPayment.pay());
console.log(cryptoPayment.pay());
