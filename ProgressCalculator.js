class ProgressCalculator {
    constructor() {
      this.totalAmount = 0;
      this.progressAmount = 0;
      this.amountProgressItems = 0;
      this.progressBarPercentage = 0;
    }
  
    progress(amount) {
      this.progressAmount += amount;
      return this.updateProgressbarPercentage();
    }
  
    getCurrentValue() {
      return this.progressBarPercentage;
    }
  
    addProgressItem(itemAmount) {
      this.totalAmount += itemAmount;
      this.amountProgressItems++;
      return this.updateProgressbarPercentage();
    }
  
    updateProgressbarPercentage() {
      const newProgressBarPercentage = this.round(this.calculateProgressPercentage());
      if (this.progressBarPercentage === newProgressBarPercentage) {
        return false;
      } else {
        this.progressBarPercentage = newProgressBarPercentage;
        return true;
      }
    }
  
    getAmountOfItems() {
      return this.amountProgressItems;
    }
  
    removeProgressItem(byteAmount) {
      if (this.amountProgressItems > 0) {
        this.totalAmount -= byteAmount;
        this.amountProgressItems--;
      }
      return this.updateProgressbarPercentage();
    }
  
    calculateProgressPercentage() {
      const x = this.progressAmount;
      const y = this.totalAmount;
      const result = (x / y) * 100;
      return Math.round(result);
    }
  
    round(num) {
      const temp = num % 5;
      if (temp < 3) {
        return num - temp;
      } else {
        return num + 5 - temp;
      }
    }
  
    clear() {
      this.totalAmount = 0;
      this.progressAmount = 0;
      this.amountProgressItems = 0;
      this.progressBarPercentage = 0;
    }
  }
  
  export default ProgressCalculator;
  