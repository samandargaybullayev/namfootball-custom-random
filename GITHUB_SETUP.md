# GitHub ga Yuklash Ko'rsatmasi

Quyidagi qadamlarni bajaring:

## 1. Git Repository Yaratish

Terminalda quyidagi buyruqlarni bajaring:

```bash
# Git repository yaratish
git init

# Barcha fayllarni qo'shish
git add .

# Birinchi commit
git commit -m "Initial commit: NAMFOOTBALL Tournament Draw Generator"
```

## 2. GitHub Repository Yaratish

1. GitHub.com ga kiring
2. Yuqorida "+" tugmasini bosing va "New repository" ni tanlang
3. Repository nomini kiriting (masalan: `namfootball-tournament`)
4. Description yozing (ixtiyoriy)
5. Public yoki Private ni tanlang
6. **"Initialize this repository with a README" ni BELGILAMANG** (chunki bizda allaqachon README bor)
7. "Create repository" tugmasini bosing

## 3. GitHub ga Kod Yuklash

GitHub repository yaratilgandan keyin, quyidagi buyruqlarni bajaring:

```bash
# GitHub repository URL ni o'z repository URL bilan almashtiring
# Masalan: https://github.com/sizning-username/namfootball-tournament.git

git remote add origin https://github.com/sizning-username/repository-nomi.git

# Kodni GitHub ga yuklash
git branch -M main
git push -u origin main
```

## 4. GitHub Pages ga Deploy Qilish (Ixtiyoriy)

Agar loyihani bepul hosting qilmoqchi bo'lsangiz:

1. GitHub repository ga kiring
2. Settings → Pages ga o'ting
3. Source da "GitHub Actions" ni tanlang
4. Yoki `dist` papkasini deploy qiling

Yoki Vite uchun GitHub Actions workflow yaratishingiz mumkin.

## 5. .env Fayl (Agar kerak bo'lsa)

Agar environment variables ishlatmoqchi bo'lsangiz, `.env.example` fayl yarating va `.gitignore` ga `.env` ni qo'shing.

## Foydali Buyruqlar

```bash
# O'zgarishlarni ko'rish
git status

# O'zgarishlarni qo'shish
git add .

# Commit qilish
git commit -m "Your commit message"

# GitHub ga yuklash
git push

# GitHub dan olish
git pull
```

## Xatoliklar

Agar xatolik bo'lsa:

```bash
# Remote ni tekshirish
git remote -v

# Remote ni o'zgartirish
git remote set-url origin https://github.com/sizning-username/repository-nomi.git

# Force push (ehtiyotkorlik bilan ishlating)
git push -f origin main
```
