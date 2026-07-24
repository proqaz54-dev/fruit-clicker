const FRUITS = [
  { id: 'apple', name: 'Apple', emoji: '🍎', baseCost: 0, baseIncome: 0.5, cpc: 1, costMultiplier: 1.15, unlocked: true, minCost: 0 },
  { id: 'orange', name: 'Orange', emoji: '🍊', baseCost: 50, baseIncome: 2, cpc: 2, costMultiplier: 1.15, unlocked: false, minCost: 100 },
  { id: 'lemon', name: 'Lemon', emoji: '🍋', baseCost: 200, baseIncome: 6, cpc: 5, costMultiplier: 1.15, unlocked: false, minCost: 500 },
  { id: 'grape', name: 'Grapes', emoji: '🍇', baseCost: 800, baseIncome: 18, cpc: 10, costMultiplier: 1.15, unlocked: false, minCost: 3000 },
  { id: 'strawberry', name: 'Strawberry', emoji: '🍓', baseCost: 3000, baseIncome: 50, cpc: 20, costMultiplier: 1.15, unlocked: false, minCost: 15000 },
  { id: 'peach', name: 'Peach', emoji: '🍑', baseCost: 12000, baseIncome: 150, cpc: 40, costMultiplier: 1.15, unlocked: false, minCost: 60000 },
  { id: 'cherry', name: 'Cherry', emoji: '🍒', baseCost: 40000, baseIncome: 500, cpc: 80, costMultiplier: 1.15, unlocked: false, minCost: 200000 },
  { id: 'kiwi', name: 'Kiwi', emoji: '🥝', baseCost: 150000, baseIncome: 1500, cpc: 160, costMultiplier: 1.15, unlocked: false, minCost: 800000 },
  { id: 'pineapple', name: 'Pineapple', emoji: '🍍', baseCost: 500000, baseIncome: 5000, cpc: 320, costMultiplier: 1.15, unlocked: false, minCost: 3000000 },
  { id: 'watermelon', name: 'Watermelon', emoji: '🍉', baseCost: 2000000, baseIncome: 15000, cpc: 640, costMultiplier: 1.15, unlocked: false, minCost: 10000000 },
];

const SAVE_KEY = 'fruitclicker_save';
const SAVE_VERSION = 1;

class Game {
  constructor() {
    this.coins = 0;
    this.totalCoins = 0;
    this.totalClicks = 0;
    this.clickPower = 1;
    this.incomePerSecond = 0;
    this.prestigeLevel = 0;
    this.prestigeMultiplier = 1;
    this.currentTab = 'garden';
    this.fruitCounts = FRUITS.map(() => 0);
    this.lastTick = Date.now();
    this.tickInterval = null;
    this.saveInterval = null;
    this.audioCtx = null;

    this.fruitCounts[0] = 1;
    this.recalculate();
    this.load();
    this.setupEventListeners();
    this.renderFruits();
    this.updateUI();
    this.startTimers();
    this.showTab('garden');
  }

  getFruitCost(fruit, index) {
    const count = this.fruitCounts[index];
    if (count === 0) return fruit.baseCost;
    return Math.floor(fruit.baseCost * Math.pow(fruit.costMultiplier, count));
  }

  getFruitsOwned() {
    return this.fruitCounts.reduce((a, b) => a + b, 0);
  }

  recalculate() {
    this.clickPower = 1 * this.prestigeMultiplier;
    let income = 0;
    FRUITS.forEach((fruit, i) => {
      income += fruit.baseIncome * this.fruitCounts[i] * this.prestigeMultiplier;
    });
    this.incomePerSecond = income;
  }

  canAfford(index) {
    if (!FRUITS[index].unlocked && this.totalCoins < FRUITS[index].minCost) return false;
    return this.coins >= this.getFruitCost(FRUITS[index], index);
  }

  buyFruit(index) {
    if (!this.canAfford(index)) return;
    const cost = this.getFruitCost(FRUITS[index], index);
    this.coins -= cost;
    this.fruitCounts[index]++;
    this.recalculate();
    this.renderFruits();
    this.updateUI();
    this.flashCard(index);
    this.playBuySound();
  }

  clickFruit(e) {
    const rect = document.getElementById('clickArea').getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    const coins = this.clickPower;
    this.coins += coins;
    this.totalCoins += coins;
    this.totalClicks++;

    const fruitWrapper = document.getElementById('clickFruitWrapper');
    this.spawnParticles(x - rect.left, y - rect.top);
    this.spawnCoinPopup(x - rect.left, y - rect.top);

    const fruitEl = document.getElementById('clickFruit');
    fruitEl.classList.remove('pulse');
    void fruitEl.offsetWidth;
    fruitEl.classList.add('pulse');

    fruitWrapper.style.transform = 'scale(0.9)';
    setTimeout(() => { fruitWrapper.style.transform = ''; }, 100);

    this.updateUI();
  }

  spawnParticles(x, y) {
    const container = document.getElementById('particleContainer');
    const emojis = ['✨', '🌟', '💫', '⭐', '🍎', '🍊', '🍋'];
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left = (x + (Math.random() - 0.5) * 60) + 'px';
      p.style.top = (y + (Math.random() - 0.5) * 60) + 'px';
      p.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
      container.appendChild(p);
      setTimeout(() => p.remove(), 1000);
    }
  }

  spawnCoinPopup(x, y) {
    const container = document.getElementById('particleContainer');
    const p = document.createElement('div');
    p.className = 'coin-particle';
    p.textContent = '+' + this.clickPower;
    p.style.left = (x + (Math.random() - 0.5) * 40) + 'px';
    p.style.top = (y - 30) + 'px';
    container.appendChild(p);
    setTimeout(() => p.remove(), 1000);
  }

  flashCard(index) {
    const cards = document.querySelectorAll('.fruit-card');
    if (cards[index]) {
      cards[index].style.borderColor = 'var(--accent)';
      cards[index].style.boxShadow = '0 0 20px rgba(6, 214, 160, 0.3)';
      setTimeout(() => {
        cards[index].style.borderColor = '';
        cards[index].style.boxShadow = '';
      }, 500);
    }
  }

  renderFruits() {
    const list = document.getElementById('fruitsList');
    list.innerHTML = '';
    FRUITS.forEach((fruit, i) => {
      const count = this.fruitCounts[i];
      const cost = this.getFruitCost(fruit, i);
      const income = fruit.baseIncome * this.prestigeMultiplier;
      const unlocked = fruit.unlocked || this.totalCoins >= fruit.minCost;
      const affordable = this.coins >= cost;

      const card = document.createElement('div');
      card.className = 'fruit-card' + (unlocked ? ' affordable' : ' locked');
      card.innerHTML = `
        <div class="fruit-card-emoji">${fruit.emoji}</div>
        <div class="fruit-card-info">
          <div class="fruit-card-name">
            ${fruit.name}
            ${count > 0 ? '<span class="fruit-card-count">' + count + '</span>' : ''}
          </div>
          <div class="fruit-card-income">+${income.toFixed(0)}/sec</div>
          <div class="fruit-card-cost">
            🪙 ${this.formatNumber(cost)}
          </div>
          <div class="buy-indicator">${!unlocked ? '🔒 Unlock at ' + this.formatNumber(fruit.minCost) + ' total' : affordable ? 'Tap to buy' : 'Not enough'}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        if (unlocked && affordable) {
          this.buyFruit(i);
        } else if (!unlocked) {
          this.showNotification('🔒 Earn ' + this.formatNumber(fruit.minCost) + ' more coins to unlock!');
        }
      });

      list.appendChild(card);
    });
  }

  updateUI() {
    this.recalculate();

    document.getElementById('coinDisplay').textContent = this.formatNumber(Math.floor(this.coins));
    document.getElementById('incomeDisplay').textContent = this.formatNumber(this.incomePerSecond, 1) + '/sec';
    document.getElementById('clickPowerDisplay').textContent = '+' + this.formatNumber(this.clickPower);

    const totalFruits = this.getFruitsOwned();
    document.getElementById('fruitCount').textContent = totalFruits;

    const progress = Math.min(100, (this.coins / 10000) * 100);
    document.getElementById('progressBar').style.width = progress + '%';

    const statsTab = this.currentTab === 'stats';
    if (statsTab) {
      document.getElementById('statTotalCoins').textContent = this.formatNumber(this.totalCoins);
      document.getElementById('statTotalClicks').textContent = this.formatNumber(this.totalClicks);
      document.getElementById('statClickPower').textContent = this.formatNumber(this.clickPower);
      document.getElementById('statIncome').textContent = this.formatNumber(this.incomePerSecond, 1) + '/sec';
      document.getElementById('statFruits').textContent = totalFruits;
      document.getElementById('statPrestige').textContent = this.prestigeLevel;
      document.getElementById('statPrestigeBonus').textContent = this.prestigeMultiplier + 'x';
    }

    const prestigeTab = this.currentTab === 'prestige';
    if (prestigeTab) {
      document.getElementById('prestigeLevel').textContent = this.prestigeLevel;
      document.getElementById('prestigeMultiplier').textContent = this.prestigeMultiplier + 'x';
      const nextPrestige = Math.floor(Math.pow(1.5, this.prestigeLevel + 1) * 1000);
      document.getElementById('prestigeRequired').textContent = this.formatNumber(nextPrestige);
      const willGain = Math.ceil(Math.sqrt(this.totalCoins / 1000));
      document.getElementById('prestigeGain').textContent = '+' + willGain;
      const canPrestige = this.totalCoins >= nextPrestige;
      const btn = document.getElementById('prestigeBtn');
      btn.disabled = !canPrestige;
      btn.textContent = canPrestige ? 'Prestige' : 'Need ' + this.formatNumber(nextPrestige) + ' total';
    }

    this.renderFruits();
  }

  showTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.footer-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    document.getElementById('tabStats').style.display = tab === 'stats' ? 'block' : 'none';
    document.getElementById('tabPrestige').style.display = tab === 'prestige' ? 'block' : 'none';
    document.getElementById('main').style.display = tab === 'garden' ? 'block' : 'none';
    if (tab === 'garden') {
      this.updateUI();
    }
  }

  doPrestige() {
    const nextPrestige = Math.ceil(Math.pow(1.5, this.prestigeLevel + 1));
    const required = nextPrestige * 1000;
    if (this.totalCoins < required) return;

    const gained = Math.ceil(Math.sqrt(this.totalCoins / 1000));
    this.prestigeLevel += gained;
    this.prestigeMultiplier = 1 + this.prestigeLevel * 0.5;
    this.coins = 0;
    this.fruitCounts = FRUITS.map(() => 0);
    this.fruitCounts[0] = 1;
    this.totalClicks = 0;
    this.recalculate();
    this.renderFruits();
    this.updateUI();
    this.showNotification('🌟 Prestiged! Multiplier: ' + this.prestigeMultiplier + 'x');
    this.playPrestigeSound();
    this.save();
  }

  showNotification(msg) {
    const el = document.getElementById('notification');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(this._notifTimeout);
    this._notifTimeout = setTimeout(() => el.classList.remove('show'), 3000);
  }

  formatNumber(num, decimals) {
    if (num === undefined || num === null) return '0';
    const d = decimals !== undefined ? decimals : 1;
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return d > 0 ? num.toFixed(d) : Math.floor(num).toString();
  }

  save() {
    const data = {
      version: SAVE_VERSION,
      coins: this.coins,
      totalCoins: this.totalCoins,
      totalClicks: this.totalClicks,
      prestigeLevel: this.prestigeLevel,
      prestigeMultiplier: this.prestigeMultiplier,
      fruitCounts: this.fruitCounts,
      lastSave: Date.now()
    };
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data || data.version !== SAVE_VERSION) return;

      this.coins = data.coins || 0;
      this.totalCoins = data.totalCoins || 0;
      this.totalClicks = data.totalClicks || 0;
      this.prestigeLevel = data.prestigeLevel || 0;
      this.prestigeMultiplier = data.prestigeMultiplier || 1;
      this.fruitCounts = data.fruitCounts || FRUITS.map(() => 0);
      this.fruitCounts[0] = Math.max(1, this.fruitCounts[0]);

      if (data.lastSave) {
        const elapsedSec = (Date.now() - data.lastSave) / 1000;
        if (elapsedSec > 0 && this.incomePerSecond > 0) {
          const offlineEarnings = this.incomePerSecond * elapsedSec;
          this.coins += offlineEarnings;
          this.totalCoins += offlineEarnings;
          if (offlineEarnings > 1) {
            setTimeout(() => {
              this.showNotification('⚡ Offline earnings: ' + this.formatNumber(offlineEarnings) + ' coins!');
            }, 500);
          }
        }
      }

      FRUITS.forEach((fruit, i) => {
        if (this.totalCoins >= fruit.minCost) {
          fruit.unlocked = true;
        }
      });
    } catch (e) {}
  }

  playBuySound() {
    this.playTone(600, 0.05);
  }

  playPrestigeSound() {
    this.playTone(800, 0.1);
    setTimeout(() => this.playTone(1000, 0.1), 100);
    setTimeout(() => this.playTone(1200, 0.15), 200);
  }

  playTone(freq, duration) {
    try {
      if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.start(this.audioCtx.currentTime);
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {}
  }

  startTimers() {
    this.tickInterval = setInterval(() => {
      const now = Date.now();
      const delta = (now - this.lastTick) / 1000;
      this.lastTick = now;

      if (this.incomePerSecond > 0) {
        const earned = this.incomePerSecond * delta;
        this.coins += earned;
        this.totalCoins += earned;
      }

      this.updateUI();
    }, 100);

    this.saveInterval = setInterval(() => this.save(), 15000);
  }

  setupEventListeners() {
    const clickArea = document.getElementById('clickArea');
    clickArea.addEventListener('click', (e) => {
      if (e.target.closest('.fruit-card')) return;
      this.clickFruit(e);
    });
    clickArea.addEventListener('touchstart', (e) => {
      if (e.target.closest('.fruit-card')) return;
      e.preventDefault();
      this.clickFruit(e);
    }, { passive: false });

    document.querySelectorAll('.footer-btn').forEach(btn => {
      btn.addEventListener('click', () => this.showTab(btn.dataset.tab));
    });

    document.getElementById('prestigeBtn').addEventListener('click', () => this.doPrestige());

    document.getElementById('resetBtn').addEventListener('click', () => {
      if (confirm('Reset all progress?')) {
        localStorage.removeItem(SAVE_KEY);
        location.reload();
      }
    });

    window.addEventListener('beforeunload', () => this.save());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Game();
});