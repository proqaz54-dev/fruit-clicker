const FRUITS = [
  { id: 'apple', name: 'Apple', emoji: '🍎', baseCost: 0, baseIncome: 0.5, cpc: 1, costMultiplier: 1.15, unlocked: true, minCost: 0, evolutionEmojis: ['🍎', '🍏', '🌱'] },
  { id: 'banana', name: 'Banana', emoji: '🍌', baseCost: 25, baseIncome: 1, cpc: 2, costMultiplier: 1.15, unlocked: false, minCost: 25, evolutionEmojis: ['🍌', '🍌', '🌴'] },
  { id: 'orange', name: 'Orange', emoji: '🍊', baseCost: 50, baseIncome: 2, cpc: 2, costMultiplier: 1.15, unlocked: false, minCost: 100, evolutionEmojis: ['🍊', '🍊', '🧡'] },
  { id: 'lemon', name: 'Lemon', emoji: '🍋', baseCost: 200, baseIncome: 6, cpc: 5, costMultiplier: 1.15, unlocked: false, minCost: 500, evolutionEmojis: ['🍋', '🍋', '💛'] },
  { id: 'grape', name: 'Grapes', emoji: '🍇', baseCost: 800, baseIncome: 18, cpc: 10, costMultiplier: 1.15, unlocked: false, minCost: 3000, evolutionEmojis: ['🍇', '🍇', '🍷'] },
  { id: 'strawberry', name: 'Strawberry', emoji: '🍓', baseCost: 3000, baseIncome: 50, cpc: 20, costMultiplier: 1.15, unlocked: false, minCost: 15000, evolutionEmojis: ['🍓', '🍓', '🌸'] },
  { id: 'peach', name: 'Peach', emoji: '🍑', baseCost: 12000, baseIncome: 150, cpc: 40, costMultiplier: 1.15, unlocked: false, minCost: 60000, evolutionEmojis: ['🍑', '🍑', '🌺'] },
  { id: 'cherry', name: 'Cherry', emoji: '🍒', baseCost: 40000, baseIncome: 500, cpc: 80, costMultiplier: 1.15, unlocked: false, minCost: 200000, evolutionEmojis: ['🍒', '🍒', '❤️'] },
  { id: 'kiwi', name: 'Kiwi', emoji: '🥝', baseCost: 150000, baseIncome: 1500, cpc: 160, costMultiplier: 1.15, unlocked: false, minCost: 800000, evolutionEmojis: ['🥝', '🥝', '🟤'] },
  { id: 'mango', name: 'Mango', emoji: '🥭', baseCost: 300000, baseIncome: 3000, cpc: 200, costMultiplier: 1.15, unlocked: false, minCost: 1500000, evolutionEmojis: ['🥭', '🥭', '🥭'] },
  { id: 'pineapple', name: 'Pineapple', emoji: '🍍', baseCost: 500000, baseIncome: 5000, cpc: 320, costMultiplier: 1.15, unlocked: false, minCost: 3000000, evolutionEmojis: ['🍍', '🍍', '🌿'] },
  { id: 'watermelon', name: 'Watermelon', emoji: '🍉', baseCost: 2000000, baseIncome: 15000, cpc: 640, costMultiplier: 1.15, unlocked: false, minCost: 10000000, evolutionEmojis: ['🍉', '🍉', '🍉'] },
  { id: 'coconut', name: 'Coconut', emoji: '🥥', baseCost: 5000000, baseIncome: 30000, cpc: 1000, costMultiplier: 1.15, unlocked: false, minCost: 25000000, evolutionEmojis: ['🥥', '🥥', '🥥'] },
  // Exotic fruits
  { id: 'dragonfruit', name: 'Dragon Fruit', emoji: '🐉', baseCost: 15000000, baseIncome: 60000, cpc: 2000, costMultiplier: 1.15, unlocked: false, minCost: 50000000, rarity: 'rare', evolutionEmojis: ['🐉', '🐲', '🔥'] },
  { id: 'durian', name: 'Durian', emoji: '💀', baseCost: 40000000, baseIncome: 120000, cpc: 4000, costMultiplier: 1.15, unlocked: false, minCost: 150000000, rarity: 'rare', evolutionEmojis: ['💀', '💀', '⭐'] },
  { id: 'passionfruit', name: 'Passion Fruit', emoji: '🔥', baseCost: 100000000, baseIncome: 250000, cpc: 8000, costMultiplier: 1.15, unlocked: false, minCost: 400000000, rarity: 'epic', evolutionEmojis: ['🔥', '🔥', '🌟'] },
  { id: 'starfruit', name: 'Star Fruit', emoji: '⭐', baseCost: 300000000, baseIncome: 500000, cpc: 16000, costMultiplier: 1.15, unlocked: false, minCost: 1000000000, rarity: 'epic', evolutionEmojis: ['⭐', '⭐', '🌟'] },
  { id: 'lychee', name: 'Lychee', emoji: '💎', baseCost: 800000000, baseIncome: 1000000, cpc: 32000, costMultiplier: 1.15, unlocked: false, minCost: 3000000000, rarity: 'legendary', evolutionEmojis: ['💎', '💎', '👑'] },
  { id: 'rambutan', name: 'Rambutan', emoji: '🧡', baseCost: 2000000000, baseIncome: 2000000, cpc: 64000, costMultiplier: 1.15, unlocked: false, minCost: 8000000000, rarity: 'legendary', evolutionEmojis: ['🧡', '🧡', '💫'] },
];

// Exclusive fruits for real money
const EXCLUSIVE_FRUITS = [
  { id: 'goldenapple', name: 'Golden Apple', emoji: '🍏', price: 99, baseIncome: 10000, cpc: 1000, rarity: 'exclusive' },
  { id: 'rainbowberry', name: 'Rainbow Berry', emoji: '🌈', price: 99, baseIncome: 25000, cpc: 2500, rarity: 'exclusive' },
  { id: 'crystalpear', name: 'Crystal Pear', emoji: '💧', price: 99, baseIncome: 50000, cpc: 5000, rarity: 'exclusive' },
  { id: 'phoenixfruit', name: 'Phoenix Fruit', emoji: '🦅', price: 99, baseIncome: 100000, cpc: 10000, rarity: 'exclusive' },
  { id: 'autoclicker', name: 'Auto Clicker', emoji: '🤖', price: 99, baseIncome: 0, cpc: 0, rarity: 'exclusive', isAutoClicker: true },
];

// Upgrades system
const UPGRADES = [
  { id: 'click_power', name: 'Click Power', emoji: '👆', maxLevel: 50, baseCost: 100, costMultiplier: 1.5, effect: (level) => level },
  { id: 'income_boost', name: 'Income Boost', emoji: '⚡', maxLevel: 50, baseCost: 500, costMultiplier: 1.6, effect: (level) => 1 + (level * 0.1) },
  { id: 'crystal_chance', name: 'Crystal Chance', emoji: '💎', maxLevel: 20, baseCost: 1000, costMultiplier: 2, effect: (level) => 0.03 + (level * 0.01) },
  { id: 'luck', name: 'Luck', emoji: '🍀', maxLevel: 30, baseCost: 2000, costMultiplier: 1.8, effect: (level) => level * 0.05 },
];

const SHOP_ITEMS = [
  { id: 'apple', chance: 1.0, minQty: 2, maxQty: 15, price: 3 },
  { id: 'banana', chance: 0.2, minQty: 2, maxQty: 15, price: 15 },
  { id: 'orange', chance: 0.14, minQty: 1, maxQty: 10, price: 40 },
  { id: 'strawberry', chance: 0.1, minQty: 1, maxQty: 6, price: 100 },
  { id: 'cherry', chance: 0.06, minQty: 1, maxQty: 5, price: 300 },
  { id: 'peach', chance: 0.04, minQty: 1, maxQty: 4, price: 1000 },
  { id: 'watermelon', chance: 0.025, minQty: 1, maxQty: 2, price: 5000 },
  { id: 'pineapple', chance: 0.015, minQty: 1, maxQty: 2, price: 20000 },
  { id: 'mango', chance: 0.01, minQty: 1, maxQty: 2, price: 50000 },
  { id: 'grape', chance: 0.005, minQty: 1, maxQty: 1, price: 100000 },
  { id: 'kiwi', chance: 0.003, minQty: 1, maxQty: 1, price: 200000 },
  { id: 'coconut', chance: 0.002, minQty: 1, maxQty: 1, price: 500000 },
  { id: 'dragonfruit', chance: 0.001, minQty: 1, maxQty: 1, price: 2000000 },
  { id: 'durian', chance: 0.0005, minQty: 1, maxQty: 1, price: 5000000 },
  { id: 'passionfruit', chance: 0.0002, minQty: 1, maxQty: 1, price: 20000000 },
  { id: 'starfruit', chance: 0.0001, minQty: 1, maxQty: 1, price: 50000000 },
  { id: 'lychee', chance: 0.00005, minQty: 1, maxQty: 1, price: 200000000 },
  { id: 'rambutan', chance: 0.00002, minQty: 1, maxQty: 1, price: 500000000 },
];

// Crystal cases
const CRYSTAL_CASES = [
  { id: 'basic', name: 'Basic Case', emoji: '📦', cost: 10, rewards: [
    { type: 'coins', chance: 0.5, min: 100, max: 500 },
    { type: 'crystals', chance: 0.3, min: 1, max: 3 },
    { type: 'fruit', chance: 0.2, fruitIds: ['apple', 'banana', 'orange'], minQty: 1, maxQty: 3 }
  ]},
  { id: 'premium', name: 'Premium Case', emoji: '🎁', cost: 50, rewards: [
    { type: 'coins', chance: 0.4, min: 1000, max: 5000 },
    { type: 'crystals', chance: 0.35, min: 5, max: 15 },
    { type: 'fruit', chance: 0.25, fruitIds: ['lemon', 'grape', 'strawberry'], minQty: 1, maxQty: 2 }
  ]},
  { id: 'rare', name: 'Rare Case', emoji: '💎', cost: 100, rewards: [
    { type: 'coins', chance: 0.3, min: 5000, max: 20000 },
    { type: 'crystals', chance: 0.4, min: 10, max: 30 },
    { type: 'fruit', chance: 0.3, fruitIds: ['cherry', 'kiwi', 'mango', 'dragonfruit'], minQty: 1, maxQty: 1 }
  ]},
  { id: 'epic', name: 'Epic Case', emoji: '👑', cost: 250, rewards: [
    { type: 'coins', chance: 0.2, min: 20000, max: 100000 },
    { type: 'crystals', chance: 0.4, min: 25, max: 75 },
    { type: 'fruit', chance: 0.4, fruitIds: ['pineapple', 'watermelon', 'durian', 'passionfruit'], minQty: 1, maxQty: 1 }
  ]},
  { id: 'legendary', name: 'Legendary Case', emoji: '🌟', cost: 500, rewards: [
    { type: 'coins', chance: 0.15, min: 100000, max: 500000 },
    { type: 'crystals', chance: 0.45, min: 50, max: 150 },
    { type: 'fruit', chance: 0.4, fruitIds: ['coconut', 'starfruit', 'lychee', 'rambutan'], minQty: 1, maxQty: 1 }
  ]},
];

// Time-based rewards
const TIME_REWARDS = [
  { minutes: 10, type: 'coins', amount: 500, message: '10 minutes played! +500 coins' },
  { minutes: 20, type: 'crystals', amount: 5, message: '20 minutes played! +5 crystals' },
  { minutes: 30, type: 'random_fruit', message: '30 minutes played! Random fruit!' },
  { minutes: 60, type: 'crystals', amount: 15, message: '1 hour played! +15 crystals' },
  { minutes: 120, type: 'rare_fruit', message: '2 hours played! Rare fruit!' },
];

// Daily rewards
const DAILY_REWARDS = [
  { day: 1, type: 'coins', amount: 100, emoji: '🪙' },
  { day: 2, type: 'crystals', amount: 2, emoji: '💎' },
  { day: 3, type: 'coins', amount: 500, emoji: '🪙' },
  { day: 4, type: 'crystals', amount: 5, emoji: '💎' },
  { day: 5, type: 'fruit', fruitId: 'strawberry', emoji: '🍓' },
  { day: 6, type: 'crystals', amount: 10, emoji: '💎' },
  { day: 7, type: 'rare_fruit', emoji: '🌟' },
];

function createRNG(seed) {
  let t = seed + 0x6D2B79F5;
  return function() {
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function getStockSeed() {
  return Math.floor(Date.now() / 300000);
}

const SAVE_KEY = 'fruitclicker_save_v2';
const SAVE_VERSION = 2;

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
    this.fruitLevels = FRUITS.map(() => 1); // Level for each fruit
    this.lastTick = Date.now();
    this.tickInterval = null;
    this.saveInterval = null;
    this.audioCtx = null;

    // Crystals
    this.crystals = 0;
    this.totalCrystals = 0;
    this.crystalDropChance = 0.03;

    // Upgrades
    this.upgrades = {};
    UPGRADES.forEach(u => this.upgrades[u.id] = 0);

    // Exclusive fruits owned
    this.exclusiveFruits = [];
    this.purchasedExclusiveIds = [];
    
    // Auto clicker
    this.autoClickerActive = false;
    this.autoClickerInterval = null;

    // Session time rewards
    this.sessionStartTime = Date.now();
    this.claimedTimeRewards = [];

    // Daily rewards
    this.lastLoginDate = null;
    this.loginStreak = 0;
    this.lastDailyRewardDate = null;
    this.claimedDailyRewardToday = false;

    this.currentStock = [];
    this.lastStockSeed = -1;
    this.shopStock = [];
    this.fruitCounts[0] = 1;
    this.recalculate();
    this.load();
    this.checkDailyReward();
    this.generateStock();
    this.setupEventListeners();
    this.renderGarden();
    this.updateUI();
    this.startTimers();
    this.checkTimeRewards();
    this.showTab('garden');
  }

  getUpgradeLevel(id) {
    return this.upgrades[id] || 0;
  }

  getUpgradeCost(id) {
    const upgrade = UPGRADES.find(u => u.id === id);
    const level = this.getUpgradeLevel(id);
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, level));
  }

  buyUpgrade(id) {
    const upgrade = UPGRADES.find(u => u.id === id);
    const level = this.getUpgradeLevel(id);
    if (level >= upgrade.maxLevel) return;
    const cost = this.getUpgradeCost(id);
    if (this.coins < cost) return;
    
    this.coins -= cost;
    this.upgrades[id]++;
    this.recalculate();
    this.updateUI();
    this.renderUpgrades();
    this.showNotification(upgrade.emoji + ' ' + upgrade.name + ' upgraded to level ' + this.upgrades[id] + '!');
  }

  getFruitCost(fruit, index) {
    const count = this.fruitCounts[index];
    if (count === 0) return fruit.baseCost;
    return Math.floor(fruit.baseCost * Math.pow(fruit.costMultiplier, count));
  }

  getFruitEmoji(fruit, index) {
    const level = this.fruitLevels[index];
    const evoIndex = Math.min(Math.floor((level - 1) / 10), 2);
    return fruit.evolutionEmojis ? fruit.evolutionEmojis[evoIndex] : fruit.emoji;
  }

  getFruitIncome(fruit, index) {
    const level = this.fruitLevels[index];
    const baseIncome = fruit.baseIncome || 0;
    const levelBonus = 1 + ((level - 1) * 0.1);
    const incomeBoost = this.getUpgradeLevel('income_boost');
    const boostMultiplier = UPGRADES.find(u => u.id === 'income_boost').effect(incomeBoost);
    return baseIncome * levelBonus * boostMultiplier * this.prestigeMultiplier;
  }

  getFruitsOwned() {
    return this.fruitCounts.reduce((a, b) => a + b, 0);
  }

  recalculate() {
    const clickUpgradeLevel = this.getUpgradeLevel('click_power');
    this.clickPower = (1 + clickUpgradeLevel) * this.prestigeMultiplier;
    
    const crystalUpgradeLevel = this.getUpgradeLevel('crystal_chance');
    this.crystalDropChance = UPGRADES.find(u => u.id === 'crystal_chance').effect(crystalUpgradeLevel);
    
    let income = 0;
    FRUITS.forEach((fruit, i) => {
      income += this.getFruitIncome(fruit, i) * this.fruitCounts[i];
    });
    
    // Add exclusive fruits income
    this.exclusiveFruits.forEach((fruit, i) => {
      const level = this.exclusiveLevels ? this.exclusiveLevels[i] : 1;
      const boostMultiplier = UPGRADES.find(u => u.id === 'income_boost').effect(this.getUpgradeLevel('income_boost'));
      income += fruit.baseIncome * level * boostMultiplier * this.prestigeMultiplier;
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
    this.fruitLevels[index]++;
    this.recalculate();
    this.renderGarden();
    this.updateUI();
    this.flashCard(index);
    this.playBuySound();
  }

  upgradeFruit(index) {
    const fruit = FRUITS[index];
    const level = this.fruitLevels[index];
    if (this.fruitCounts[index] === 0) return;
    const cost = Math.floor(1000 * Math.pow(1.5, level));
    if (this.coins < cost) return;
    
    this.coins -= cost;
    this.fruitLevels[index]++;
    this.recalculate();
    this.renderGarden();
    this.updateUI();
    this.showNotification(fruit.emoji + ' ' + fruit.name + ' upgraded to level ' + this.fruitLevels[index] + '!');
  }

  buyExclusiveFruit(exclusive) {
    if (this.purchasedExclusiveIds.includes(exclusive.id)) return;
    
    let description = '';
    if (exclusive.isAutoClicker) {
      description = 'Automatically clicks 10 times per second!';
    } else {
      description = 'Income: ' + this.formatNumber(exclusive.baseIncome) + '/sec';
    }
    
    // Show payment dialog
    const confirmed = confirm(exclusive.emoji + ' ' + exclusive.name + '\n\nPrice: ' + exclusive.price + ' UAH\n\n' + description + '\n\nPayment integration required.\n\nDemo version - press OK to purchase (free in demo).');
    
    if (confirmed) {
      this.purchasedExclusiveIds.push(exclusive.id);
      this.exclusiveFruits.push({ ...exclusive, level: 1 });
      
      // Activate auto clicker if purchased
      if (exclusive.isAutoClicker) {
        this.activateAutoClicker();
      }
      
      this.recalculate();
      this.renderShop();
      this.updateUI();
      this.showNotification(exclusive.emoji + ' ' + exclusive.name + ' purchased!');
    }
  }

  activateAutoClicker() {
    if (this.autoClickerActive) return;
    this.autoClickerActive = true;
    
    this.autoClickerInterval = setInterval(() => {
      // Simulate clicks
      for (let i = 0; i < 10; i++) {
        this.coins += this.clickPower;
        this.totalCoins += this.clickPower;
      }
      this.updateUI();
    }, 1000);
    
    this.showNotification('🤖 Auto Clicker activated!');
  }

  deactivateAutoClicker() {
    this.autoClickerActive = false;
    if (this.autoClickerInterval) {
      clearInterval(this.autoClickerInterval);
      this.autoClickerInterval = null;
    }
  }

  buyCoins(amount) {
    const confirmed = confirm('🪙 Buy ' + this.formatNumber(amount) + ' coins\n\nPrice: 199 UAH\n\nDemo version - press OK to get coins (free in demo).');
    if (confirmed) {
      this.coins += amount;
      this.totalCoins += amount;
      this.updateUI();
      this.showNotification('🪙 +' + this.formatNumber(amount) + ' coins received!');
    }
  }

  buyCrystals(amount) {
    const confirmed = confirm('💎 Buy ' + amount + ' crystals\n\nPrice: 199 UAH\n\nDemo version - press OK to get crystals (free in demo).');
    if (confirmed) {
      this.crystals += amount;
      this.totalCrystals += amount;
      this.updateUI();
      this.showNotification('💎 +' + amount + ' crystals received!');
    }
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

    // Crystal drop chance (3%)
    if (Math.random() < this.crystalDropChance) {
      const crystals = Math.floor(Math.random() * 3) + 1;
      this.crystals += crystals;
      this.totalCrystals += crystals;
      this.spawnCrystalPopup(x - rect.left, y - rect.top, crystals);
    }

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

  spawnCrystalPopup(x, y, amount) {
    const container = document.getElementById('particleContainer');
    const p = document.createElement('div');
    p.className = 'crystal-particle';
    p.textContent = '💎+' + amount;
    p.style.left = (x + (Math.random() - 0.5) * 60) + 'px';
    p.style.top = (y - 50) + 'px';
    container.appendChild(p);
    setTimeout(() => p.remove(), 1500);
    this.playCrystalSound();
  }

  playCrystalSound() {
    this.playTone(1200, 0.1);
    setTimeout(() => this.playTone(1500, 0.15), 80);
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

  renderGarden() {
    const list = document.getElementById('fruitsList');
    list.innerHTML = '';
    
    // Render fruits
    FRUITS.forEach((fruit, i) => {
      const count = this.fruitCounts[i];
      const cost = this.getFruitCost(fruit, i);
      const income = this.getFruitIncome(fruit, i);
      const unlocked = fruit.unlocked || this.totalCoins >= fruit.minCost;
      const affordable = this.coins >= cost;
      const emoji = this.getFruitEmoji(fruit, i);
      const level = this.fruitLevels[i];

      const rarityClass = fruit.rarity ? ' ' + fruit.rarity : '';
      const card = document.createElement('div');
      card.className = 'fruit-card' + (unlocked ? ' affordable' : ' locked') + rarityClass;
      card.innerHTML = `
        <div class="fruit-card-emoji">${emoji}</div>
        <div class="fruit-card-info">
          <div class="fruit-card-name">
            ${fruit.name}
            ${count > 0 ? '<span class="fruit-card-count">x' + count + '</span>' : ''}
            ${level > 1 ? '<span class="fruit-level">⭐' + level + '</span>' : ''}
            ${fruit.rarity ? '<span class="fruit-rarity-tag ' + fruit.rarity + '">' + fruit.rarity.toUpperCase() + '</span>' : ''}
          </div>
          <div class="fruit-card-income">+${income.toFixed(0)}/sec</div>
          <div class="fruit-card-cost">
            🪙 ${this.formatNumber(cost)}
            ${count > 0 ? '<button class="upgrade-btn" data-upgrade-fruit="' + i + '">⬆️ ' + this.formatNumber(Math.floor(1000 * Math.pow(1.5, level))) + '</button>' : ''}
          </div>
          <div class="buy-indicator">${!unlocked ? '🔒 Unlock at ' + this.formatNumber(fruit.minCost) + ' total' : affordable ? 'Tap to buy' : 'Not enough'}</div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('upgrade-btn')) {
          this.upgradeFruit(i);
        } else if (unlocked && affordable) {
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

    // Update crystal display
    const crystalDisplay = document.getElementById('crystalDisplay');
    if (crystalDisplay) {
      crystalDisplay.textContent = this.formatNumber(Math.floor(this.crystals));
    }

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
      document.getElementById('statCrystals').textContent = this.formatNumber(this.totalCrystals);
      document.getElementById('statStreak').textContent = this.loginStreak + ' days';
    }

    // Update current tab content
    if (this.currentTab === 'garden') {
      this.renderGarden();
    } else if (this.currentTab === 'shop') {
      this.renderShop();
    } else if (this.currentTab === 'inventory') {
      this.renderInventory();
    } else if (this.currentTab === 'upgrades') {
      this.renderUpgrades();
    } else if (this.currentTab === 'cases') {
      this.renderCases();
    } else if (this.currentTab === 'rewards') {
      this.renderTimeRewards();
      this.renderDailyRewards();
    }
  }

  showTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.footer-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Hide all tabs first
    document.getElementById('tabStats').style.display = 'none';
    document.getElementById('tabShop').style.display = 'none';
    document.getElementById('tabCases').style.display = 'none';
    document.getElementById('tabRewards').style.display = 'none';
    document.getElementById('tabInventory').style.display = 'none';
    document.getElementById('tabUpgrades').style.display = 'none';
    document.getElementById('main').style.display = 'none';
    
    // Show selected tab
    if (tab === 'garden' || tab === 'shop' || tab === 'inventory' || tab === 'upgrades' || tab === 'cases' || tab === 'rewards') {
      document.getElementById('main').style.display = 'block';
    }
    
    if (tab === 'stats') document.getElementById('tabStats').style.display = 'block';
    if (tab === 'shop') document.getElementById('tabShop').style.display = 'block';
    if (tab === 'cases') document.getElementById('tabCases').style.display = 'block';
    if (tab === 'rewards') document.getElementById('tabRewards').style.display = 'block';
    if (tab === 'inventory') document.getElementById('tabInventory').style.display = 'block';
    if (tab === 'upgrades') document.getElementById('tabUpgrades').style.display = 'block';
    
    this.updateUI();
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
    this.fruitLevels = FRUITS.map(() => 1);
    this.fruitCounts[0] = 1;
    this.totalClicks = 0;
    this.recalculate();
    this.renderGarden();
    this.updateUI();
    this.showNotification('🌟 Prestiged! Multiplier: ' + this.prestigeMultiplier + 'x');
    this.playPrestigeSound();
    this.save();
  }

  generateStock() {
    const seed = getStockSeed();
    if (seed === this.lastStockSeed && this.shopStock.length > 0) return;
    this.lastStockSeed = seed;
    const rng = createRNG(seed);
    this.shopStock = [];
    SHOP_ITEMS.forEach(item => {
      if (rng() < item.chance) {
        const qty = item.minQty + Math.floor(rng() * (item.maxQty - item.minQty + 1));
        this.shopStock.push({
          id: item.id,
          price: item.price,
          remaining: qty,
          initialQty: qty
        });
      }
    });
    if (this.currentTab === 'shop') this.renderShop();
  }

  // ===== INVENTORY =====
  renderInventory() {
    const container = document.getElementById('inventoryList');
    if (!container) return;
    container.innerHTML = '';

    // Owned fruits
    const ownedFruits = FRUITS.filter((f, i) => this.fruitCounts[i] > 0);
    
    if (ownedFruits.length === 0 && this.exclusiveFruits.length === 0) {
      container.innerHTML = '<div class="empty-inventory">🔒 Buy fruits to see them in your inventory!</div>';
      return;
    }

    // Regular fruits
    ownedFruits.forEach((fruit, i) => {
      const fruitIdx = FRUITS.indexOf(fruit);
      const count = this.fruitCounts[fruitIdx];
      const level = this.fruitLevels[fruitIdx];
      const emoji = this.getFruitEmoji(fruit, fruitIdx);
      const income = this.getFruitIncome(fruit, fruitIdx);
      const rarityClass = fruit.rarity ? ' ' + fruit.rarity : '';

      const card = document.createElement('div');
      card.className = 'inventory-item' + rarityClass;
      card.innerHTML = `
        <div class="inventory-emoji">${emoji}</div>
        <div class="inventory-info">
          <div class="inventory-name">${fruit.name}</div>
          <div class="inventory-details">
            <span class="inv-count">x${count}</span>
            <span class="inv-level">⭐${level}</span>
          </div>
          <div class="inventory-income">+${this.formatNumber(income * count)}/сек</div>
        </div>
        ${fruit.rarity ? '<span class="fruit-rarity-tag ' + fruit.rarity + '">' + fruit.rarity.toUpperCase() + '</span>' : ''}
      `;
      container.appendChild(card);
    });

    // Exclusive fruits
    this.exclusiveFruits.forEach((fruit, i) => {
      const level = this.exclusiveLevels ? this.exclusiveLevels[i] : 1;
      const card = document.createElement('div');
      card.className = 'inventory-item exclusive';
      card.innerHTML = `
        <div class="inventory-emoji">${fruit.emoji}</div>
        <div class="inventory-info">
          <div class="inventory-name">${fruit.name}</div>
          <div class="inventory-details">
            <span class="inv-count">x1</span>
            <span class="inv-level">⭐${level}</span>
          </div>
          <div class="inventory-income">+${this.formatNumber(fruit.baseIncome * level)}/сек</div>
        </div>
        <span class="fruit-rarity-tag exclusive">EXCLUSIVE</span>
      `;
      container.appendChild(card);
    });
  }

  // ===== UPGRADES =====
  renderUpgrades() {
    const container = document.getElementById('upgradesList');
    if (!container) return;
    container.innerHTML = '';

    UPGRADES.forEach(upgrade => {
      const level = this.getUpgradeLevel(upgrade.id);
      const cost = this.getUpgradeCost(upgrade.id);
      const maxed = level >= upgrade.maxLevel;
      const canAfford = this.coins >= cost && !maxed;

      let effectText = '';
      if (upgrade.id === 'click_power') {
        effectText = '+' + (1 + level) + ' за клік';
      } else if (upgrade.id === 'income_boost') {
        effectText = 'x' + upgrade.effect(level).toFixed(1) + ' дохід';
      } else if (upgrade.id === 'crystal_chance') {
        effectText = (upgrade.effect(level) * 100).toFixed(0) + '% шанс';
      } else if (upgrade.id === 'luck') {
        effectText = '+' + (level * 5) + '% удача';
      }

      const card = document.createElement('div');
      card.className = 'upgrade-item' + (maxed ? ' maxed' : canAfford ? ' affordable' : '');
      card.innerHTML = `
        <div class="upgrade-emoji">${upgrade.emoji}</div>
        <div class="upgrade-info">
          <div class="upgrade-name">${upgrade.name}</div>
          <div class="upgrade-level">Рівень ${level}/${upgrade.maxLevel}</div>
          <div class="upgrade-effect">${effectText}</div>
        </div>
        <div class="upgrade-action">
          ${maxed ? '<span class="maxed-label">MAX</span>' : `
            <div class="upgrade-cost">🪙 ${this.formatNumber(cost)}</div>
            <button class="upgrade-btn" data-upgrade-id="${upgrade.id}" ${!canAfford ? 'disabled' : ''}>
              ${canAfford ? 'Upgrade' : 'Need more'}
            </button>
          `}
        </div>
      `;

      if (!maxed) {
        const btn = card.querySelector('.upgrade-btn');
        if (btn) {
          btn.addEventListener('click', () => this.buyUpgrade(upgrade.id));
        }
      }

      container.appendChild(card);
    });
  }

  getFruitById(id) {
    return FRUITS.find(f => f.id === id);
  }

  buyShopItem(index) {
    const stockItem = this.shopStock[index];
    if (!stockItem || stockItem.remaining <= 0) return;
    const fruit = this.getFruitById(stockItem.id);
    if (!fruit) return;
    const totalPrice = stockItem.price;
    if (this.coins < totalPrice) return;

    const fruitIdx = FRUITS.indexOf(fruit);
    this.coins -= totalPrice;
    this.fruitCounts[fruitIdx]++;
    stockItem.remaining--;
    fruit.unlocked = true;
    this.recalculate();
    this.renderShop();
    this.updateUI();
    this.flashCard(fruitIdx);
    this.playBuySound();
    this.showNotification('Bought ' + fruit.emoji + ' ' + fruit.name + ' from shop!');
  }

  getStockRarity(item) {
    const s = SHOP_ITEMS.find(si => si.id === item.id);
    if (!s) return '';
    if (s.chance <= 0.005) return 'epic';
    if (s.chance <= 0.02) return 'rare';
    return '';
  }

  renderShop() {
    const list = document.getElementById('shopList');
    if (!list) return;
    list.innerHTML = '';

          // === GLOBAL STOCK SECTION ===
    list.innerHTML += '<h3 class="shop-section-title">🌍 Global Stock</h3>';
    list.innerHTML += '<p class="shop-timer-display">⏰ Refresh in: <span id="shopTimer">05:00</span></p>';

    if (this.shopStock.length === 0) {
      list.innerHTML += '<div class="shop-empty"><span>📭</span>No items in stock this cycle.<br>Check back in 5 minutes!</div>';
    } else {
      this.shopStock.forEach((item, i) => {
        const fruit = this.getFruitById(item.id);
        if (!fruit) return;
        const rarity = this.getStockRarity(item);
        const canBuy = this.coins >= item.price && item.remaining > 0;
        const remainingPct = item.remaining / item.initialQty;

        const card = document.createElement('div');
        card.className = 'shop-item' + (rarity ? ' ' + rarity : '');
        card.innerHTML = `
          <div class="shop-item-emoji">${fruit.emoji}</div>
          <div class="shop-item-info">
            <div class="shop-item-name">${fruit.name}</div>
            <div class="shop-item-qty${remainingPct <= 0.25 ? ' low' : ''}">Left: ${item.remaining}</div>
          </div>
          <div class="shop-item-price">🪙 ${this.formatNumber(item.price)}</div>
          <button class="shop-btn" data-shop-index="${i}"${!canBuy ? ' disabled' : ''}>${canBuy ? 'Buy' : item.remaining <= 0 ? 'Sold' : 'Need more'}</button>
        `;

        const btn = card.querySelector('.shop-btn');
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.buyShopItem(i);
        });

        list.appendChild(card);
      });
    }

    // === PURCHASES SECTION ===
    list.innerHTML += '<h3 class="shop-section-title">💳 Purchases</h3>';
    
    // Coins purchase
    const coinsCard = document.createElement('div');
    coinsCard.className = 'purchase-item';
    coinsCard.innerHTML = `
      <div class="purchase-emoji">🪙</div>
      <div class="purchase-info">
        <div class="purchase-name">Coins</div>
        <div class="purchase-amount">1,000,000 coins</div>
      </div>
      <button class="purchase-btn" onclick="game.buyCoins(1000000)">199 UAH</button>
    `;
    list.appendChild(coinsCard);

    // Crystals purchase
    const crystalsCard = document.createElement('div');
    crystalsCard.className = 'purchase-item';
    crystalsCard.innerHTML = `
      <div class="purchase-emoji">💎</div>
      <div class="purchase-info">
        <div class="purchase-name">Crystals</div>
        <div class="purchase-amount">1000 crystals</div>
      </div>
      <button class="purchase-btn" onclick="game.buyCrystals(1000)">199 UAH</button>
    `;
    list.appendChild(crystalsCard);

    // === EXCLUSIVE FRUITS SECTION ===
    list.innerHTML += '<h3 class="shop-section-title">👑 Exclusive Items</h3>';
    list.innerHTML += '<p class="exclusive-desc">Can only be purchased with real money!</p>';
    
    EXCLUSIVE_FRUITS.forEach(exclusive => {
      const owned = this.purchasedExclusiveIds.includes(exclusive.id);
      const card = document.createElement('div');
      card.className = 'exclusive-item' + (owned ? ' owned' : '') + (exclusive.isAutoClicker ? ' auto-clicker' : '');
      
      let itemDesc = '';
      if (exclusive.isAutoClicker) {
        itemDesc = '🤖 +10 clicks/sec';
      } else {
        itemDesc = '+' + this.formatNumber(exclusive.baseIncome) + '/sec';
      }
      
      card.innerHTML = `
        <div class="exclusive-emoji">${exclusive.emoji}</div>
        <div class="exclusive-info">
          <div class="exclusive-name">${exclusive.name}</div>
          <div class="exclusive-income">${itemDesc}</div>
        </div>
        ${owned ? '<span class="owned-label">✅ Owned</span>' : '<button class="exclusive-btn" data-exclusive="' + exclusive.id + '">' + exclusive.price + ' UAH</button>'}
      `;
      
      if (!owned) {
        const btn = card.querySelector('.exclusive-btn');
        btn.addEventListener('click', () => this.buyExclusiveFruit(exclusive));
      }
      
      list.appendChild(card);
    });

    this.updateShopTimer();
  }

  // ===== CRYSTAL CASES =====
  renderCases() {
    const list = document.getElementById('casesList');
    if (!list) return;
    list.innerHTML = '';

    CRYSTAL_CASES.forEach((caseItem, i) => {
      const canBuy = this.crystals >= caseItem.cost;
      const rarityClass = caseItem.id === 'legendary' ? ' legendary' : 
                          caseItem.id === 'epic' ? ' epic' : 
                          caseItem.id === 'rare' ? ' rare' : '';

      const card = document.createElement('div');
      card.className = 'case-item' + rarityClass;
      card.innerHTML = `
        <div class="case-emoji">${caseItem.emoji}</div>
        <div class="case-info">
          <div class="case-name">${caseItem.name}</div>
          <div class="case-cost">💎 ${caseItem.cost}</div>
        </div>
        <button class="case-btn" data-case-index="${i}"${!canBuy ? ' disabled' : ''}>${canBuy ? 'Open' : 'Need more'}</button>
      `;

      const btn = card.querySelector('.case-btn');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.buyCase(i);
      });

      list.appendChild(card);
    });
  }

  buyCase(index) {
    const caseItem = CRYSTAL_CASES[index];
    if (!caseItem || this.crystals < caseItem.cost) return;

    this.crystals -= caseItem.cost;
    
    // Pick a random reward
    const roll = Math.random();
    let cumulativeChance = 0;
    let reward = null;
    
    for (const r of caseItem.rewards) {
      cumulativeChance += r.chance;
      if (roll < cumulativeChance) {
        reward = r;
        break;
      }
    }

    if (!reward) reward = caseItem.rewards[0];

    let rewardText = '';
    
    if (reward.type === 'coins') {
      const amount = Math.floor(Math.random() * (reward.max - reward.min + 1)) + reward.min;
      this.coins += amount;
      this.totalCoins += amount;
      rewardText = '🪙 +' + this.formatNumber(amount) + ' coins!';
    } else if (reward.type === 'crystals') {
      const amount = Math.floor(Math.random() * (reward.max - reward.min + 1)) + reward.min;
      this.crystals += amount;
      this.totalCrystals += amount;
      rewardText = '💎 +' + amount + ' crystals!';
    } else if (reward.type === 'fruit') {
      const fruitId = reward.fruitIds[Math.floor(Math.random() * reward.fruitIds.length)];
      const fruit = this.getFruitById(fruitId);
      const qty = Math.floor(Math.random() * (reward.maxQty - reward.minQty + 1)) + reward.minQty;
      const fruitIdx = FRUITS.indexOf(fruit);
      this.fruitCounts[fruitIdx] += qty;
      fruit.unlocked = true;
      rewardText = fruit.emoji + ' +' + qty + ' ' + fruit.name + '!';
      this.recalculate();
    }

    this.updateUI();
    this.playCrystalSound();
    this.showNotification('📦 ' + caseItem.name + ': ' + rewardText);
  }

  // ===== TIME-BASED REWARDS =====
  checkTimeRewards() {
    const elapsed = Math.floor((Date.now() - this.sessionStartTime) / 60000); // minutes
    
    TIME_REWARDS.forEach((reward, i) => {
      if (elapsed >= reward.minutes && !this.claimedTimeRewards.includes(reward.minutes)) {
        this.claimedTimeRewards.push(reward.minutes);
        this.grantTimeReward(reward);
      }
    });
  }

  grantTimeReward(reward) {
    if (reward.type === 'coins') {
      this.coins += reward.amount;
      this.totalCoins += reward.amount;
    } else if (reward.type === 'crystals') {
      this.crystals += reward.amount;
      this.totalCrystals += reward.amount;
    } else if (reward.type === 'random_fruit') {
      const idx = Math.floor(Math.random() * 13); // Basic fruits
      this.fruitCounts[idx]++;
      FRUITS[idx].unlocked = true;
      this.recalculate();
    } else if (reward.type === 'rare_fruit') {
      const rareFruits = FRUITS.filter(f => f.rarity);
      const fruit = rareFruits[Math.floor(Math.random() * rareFruits.length)];
      const idx = FRUITS.indexOf(fruit);
      this.fruitCounts[idx]++;
      fruit.unlocked = true;
      this.recalculate();
    }
    
    this.showNotification('🎁 ' + reward.message);
    this.updateUI();
  }

  renderTimeRewards() {
    const container = document.getElementById('timeRewards');
    if (!container) return;
    container.innerHTML = '';

    const elapsed = Math.floor((Date.now() - this.sessionStartTime) / 60000);

    TIME_REWARDS.forEach(reward => {
      const claimed = this.claimedTimeRewards.includes(reward.minutes);
      const timeStr = reward.minutes >= 60 ? (reward.minutes / 60) + 'h' : reward.minutes + 'm';
      
      const card = document.createElement('div');
      card.className = 'reward-item' + (claimed ? ' claimed' : elapsed >= reward.minutes ? ' available' : '');
      
      const icon = reward.type === 'coins' ? '🪙' : 
                   reward.type === 'crystals' ? '💎' : 
                   reward.type === 'random_fruit' ? '🍎' : '🌟';
      const amount = reward.amount ? reward.amount : '';
      
      card.innerHTML = `
        <div class="reward-icon">${claimed ? '✅' : icon}</div>
        <div class="reward-info">
          <div class="reward-time">${timeStr}</div>
          <div class="reward-amount">${amount ? '+' + amount : ''} ${reward.type.replace('_', ' ')}</div>
        </div>
        <button class="claim-btn" ${!claimed && elapsed >= reward.minutes ? '' : 'disabled'}>
          ${claimed ? 'Claimed' : elapsed >= reward.minutes ? 'Claim!' : timeStr}
        </button>
      `;

      if (!claimed && elapsed >= reward.minutes) {
        const btn = card.querySelector('.claim-btn');
        btn.addEventListener('click', () => {
          this.claimedTimeRewards.push(reward.minutes);
          this.grantTimeReward(reward);
          this.renderTimeRewards();
        });
      }

      container.appendChild(card);
    });
  }

  // ===== DAILY REWARDS =====
  checkDailyReward() {
    const today = new Date().toDateString();
    
    if (this.lastLoginDate === today) {
      this.claimedDailyRewardToday = true;
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (this.lastLoginDate === yesterday.toDateString()) {
      this.loginStreak++;
    } else if (this.lastLoginDate !== today) {
      this.loginStreak = 1;
    }

    this.lastLoginDate = today;
    this.claimedDailyRewardToday = false;
  }

  renderDailyRewards() {
    const container = document.getElementById('dailyRewards');
    if (!container) return;
    container.innerHTML = '';

    DAILY_REWARDS.forEach((reward, i) => {
      const dayInCycle = ((this.loginStreak - 1) % 7) + 1;
      const isToday = reward.day === dayInCycle && !this.claimedDailyRewardToday;
      const isPast = reward.day < dayInCycle;
      const isClaimed = reward.day < dayInCycle || (reward.day === dayInCycle && this.claimedDailyRewardToday);
      
      const card = document.createElement('div');
      card.className = 'daily-reward-item' + (isToday ? ' today' : isPast ? ' past' : '');
      
      const rewardDisplay = reward.type === 'coins' ? '🪙 ' + reward.amount :
                           reward.type === 'crystals' ? '💎 ' + reward.amount :
                           reward.emoji;
      
      card.innerHTML = `
        <div class="daily-day">Day ${reward.day}</div>
        <div class="daily-icon">${isPast ? '✅' : rewardDisplay}</div>
        <div class="daily-label">${isToday ? 'TODAY!' : isPast ? 'Done' : 'Locked'}</div>
      `;

      if (isToday && !this.claimedDailyRewardToday) {
        card.addEventListener('click', () => this.claimDailyReward(reward));
        card.style.cursor = 'pointer';
      }

      container.appendChild(card);
    });

    // Update streak display
    const streakEl = document.getElementById('streakDisplay');
    if (streakEl) {
      streakEl.textContent = '🔥 ' + this.loginStreak + ' day streak';
    }
  }

  claimDailyReward(reward) {
    if (this.claimedDailyRewardToday) return;

    this.claimedDailyRewardToday = true;

    if (reward.type === 'coins') {
      this.coins += reward.amount;
      this.totalCoins += reward.amount;
    } else if (reward.type === 'crystals') {
      this.crystals += reward.amount;
      this.totalCrystals += reward.amount;
    } else if (reward.type === 'fruit') {
      const fruit = this.getFruitById(reward.fruitId);
      const idx = FRUITS.indexOf(fruit);
      this.fruitCounts[idx]++;
      fruit.unlocked = true;
      this.recalculate();
    } else if (reward.type === 'rare_fruit') {
      const rareFruits = FRUITS.filter(f => f.rarity);
      const fruit = rareFruits[Math.floor(Math.random() * rareFruits.length)];
      const idx = FRUITS.indexOf(fruit);
      this.fruitCounts[idx]++;
      fruit.unlocked = true;
      this.recalculate();
    }

    this.updateUI();
    this.playCrystalSound();
    this.showNotification('🎁 Daily Reward: ' + reward.emoji + ' Claimed! Streak: ' + this.loginStreak + ' days');
    this.renderDailyRewards();
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
      fruitLevels: this.fruitLevels,
      lastSave: Date.now(),
      crystals: this.crystals,
      totalCrystals: this.totalCrystals,
      lastLoginDate: this.lastLoginDate,
      loginStreak: this.loginStreak,
      claimedDailyRewardToday: this.claimedDailyRewardToday,
      claimedTimeRewards: this.claimedTimeRewards,
      sessionStartTime: this.sessionStartTime,
      upgrades: this.upgrades,
      exclusiveFruits: this.exclusiveFruits,
      purchasedExclusiveIds: this.purchasedExclusiveIds,
      autoClickerActive: this.autoClickerActive
    };
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (e) {
      console.log('Save error:', e);
    }
  }

  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data || data.version !== SAVE_VERSION) {
        // Try loading from old version
        if (data && data.version === 1) {
          this.migrateFromV1(data);
        }
        return;
      }

      this.coins = data.coins || 0;
      this.totalCoins = data.totalCoins || 0;
      this.totalClicks = data.totalClicks || 0;
      this.prestigeLevel = data.prestigeLevel || 0;
      this.prestigeMultiplier = data.prestigeMultiplier || 1;
      
      const oldCounts = data.fruitCounts || [];
      this.fruitCounts = FRUITS.map((_, i) => oldCounts[i] || 0);
      this.fruitCounts[0] = Math.max(1, this.fruitCounts[0]);
      
      const oldLevels = data.fruitLevels || [];
      this.fruitLevels = FRUITS.map((_, i) => oldLevels[i] || 1);

      this.crystals = data.crystals || 0;
      this.totalCrystals = data.totalCrystals || 0;
      this.lastLoginDate = data.lastLoginDate || null;
      this.loginStreak = data.loginStreak || 0;
      this.claimedDailyRewardToday = data.claimedDailyRewardToday || false;
      this.claimedTimeRewards = data.claimedTimeRewards || [];
      this.sessionStartTime = data.sessionStartTime || Date.now();
      
      // Load upgrades
      if (data.upgrades) {
        Object.keys(data.upgrades).forEach(key => {
          if (this.upgrades.hasOwnProperty(key)) {
            this.upgrades[key] = data.upgrades[key];
          }
        });
      }
      
      // Load exclusive fruits
      if (data.exclusiveFruits) {
        this.exclusiveFruits = data.exclusiveFruits;
      }
      if (data.purchasedExclusiveIds) {
        this.purchasedExclusiveIds = data.purchasedExclusiveIds;
      }
      
      // Load auto clicker state
      if (data.autoClickerActive && !this.autoClickerActive) {
        this.activateAutoClicker();
      }

      if (data.lastSave) {
        const elapsedSec = (Date.now() - data.lastSave) / 1000;
        if (elapsedSec > 0 && this.incomePerSecond > 0) {
          const offlineEarnings = this.incomePerSecond * elapsedSec;
          this.coins += offlineEarnings;
          this.totalCoins += offlineEarnings;
          if (offlineEarnings > 1) {
            setTimeout(() => {
              this.showNotification('⚡ Офлайн дохід: ' + this.formatNumber(offlineEarnings) + ' монет!');
            }, 500);
          }
        }
      }

      FRUITS.forEach((fruit, i) => {
        if (this.totalCoins >= fruit.minCost) {
          fruit.unlocked = true;
        }
      });
      
      this.showNotification('💾 Прогрес завантажено!');
    } catch (e) {
      console.log('Load error:', e);
    }
  }

  migrateFromV1(data) {
    // Migration from version 1 to version 2
    this.coins = data.coins || 0;
    this.totalCoins = data.totalCoins || 0;
    this.totalClicks = data.totalClicks || 0;
    this.prestigeLevel = data.prestigeLevel || 0;
    this.prestigeMultiplier = data.prestigeMultiplier || 1;
    
    const oldCounts = data.fruitCounts || [];
    this.fruitCounts = FRUITS.map((_, i) => oldCounts[i] || 0);
    this.fruitCounts[0] = Math.max(1, this.fruitCounts[0]);
    this.fruitLevels = FRUITS.map(() => 1);
    
    this.crystals = data.crystals || 0;
    this.totalCrystals = data.totalCrystals || 0;
    this.lastLoginDate = data.lastLoginDate || null;
    this.loginStreak = data.loginStreak || 0;
    this.claimedDailyRewardToday = data.claimedDailyRewardToday || false;
    this.claimedTimeRewards = data.claimedTimeRewards || [];
    this.sessionStartTime = data.sessionStartTime || Date.now();
    
    this.upgrades = {};
    UPGRADES.forEach(u => this.upgrades[u.id] = 0);
    this.exclusiveFruits = [];
    this.purchasedExclusiveIds = [];
    this.autoClickerActive = false;
    
    this.save();
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

    this._shopTimerInterval = setInterval(() => {
      this.updateShopTimer();

      const newSeed = getStockSeed();
      if (newSeed !== this.lastStockSeed) {
        this.generateStock();
        if (this.currentTab !== 'shop') {
          const el = document.getElementById('shopRefreshNotif');
          if (el) {
            el.classList.add('show');
            clearTimeout(this._shopRefreshTimeout);
            this._shopRefreshTimeout = setTimeout(() => el.classList.remove('show'), 3000);
          }
        }
      }
    }, 1000);

    // Time rewards check every minute
    this._timeRewardInterval = setInterval(() => {
      this.checkTimeRewards();
    }, 60000);

    this.saveInterval = setInterval(() => this.save(), 15000);
  }

  updateShopTimer() {
    const el = document.getElementById('shopTimer');
    if (!el) return;
    const now = Date.now();
    const nextRefresh = (Math.floor(now / 300000) + 1) * 300000;
    const remaining = Math.max(0, nextRefresh - now);
    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    el.textContent = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    el.classList.toggle('urgent', remaining < 30000);
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
  const img = document.getElementById('clickFruit');
  if (img && img.tagName === 'IMG') {
    const ds = img.getAttribute('data-src') || img.getAttribute('src');
    if (ds) img.src = ds + '?v=' + Date.now();
  }
});