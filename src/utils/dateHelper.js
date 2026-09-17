// Helper for parsing, formatting and calculating days for love anniversaries and birthdays

export function parseDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const trimmed = dateStr.trim();
  if (!trimmed) return null;

  // Format 1: DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
  const dmyMatch = trimmed.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) return d;
  }

  // Format 2: YYYY-MM-DD (standard HTML5 date input)
  const ymdMatch = trimmed.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) return d;
  }

  // Format 3: DD/MM (assume current year)
  const dmMatch = trimmed.match(/^(\d{1,2})[\/\-\.](\d{1,2})$/);
  if (dmMatch) {
    const day = parseInt(dmMatch[1], 10);
    const month = parseInt(dmMatch[2], 10) - 1;
    const year = new Date().getFullYear();
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) return d;
  }

  // Fallback to Date.parse
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) return parsed;

  return null;
}

export function formatDateVN(d) {
  if (!d) return '';
  const dateObj = typeof d === 'string' ? parseDate(d) : d;
  if (!dateObj || isNaN(dateObj.getTime())) return '';
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDateInput(dateStr) {
  // Convert DD/MM/YYYY to YYYY-MM-DD for HTML <input type="date" />
  const d = parseDate(dateStr);
  if (!d) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateDaysInfo(dateStr, type = 'love') {
  const targetDate = parseDate(dateStr);
  if (!targetDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - target.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (type === 'birthday') {
    // For birthday:
    if (diffDays < 0) {
      const remaining = Math.abs(diffDays);
      return {
        days: remaining,
        isFuture: true,
        isToday: false,
        isPast: false,
        badge: `Còn ${remaining} ngày`,
        mainText: `Còn ${remaining} ngày nữa đến Sinh Nhật 🎉`,
        secondaryText: `Đếm ngược ngày đặc biệt (${formatDateVN(targetDate)})`,
        floatingWords: [`Còn ${remaining} ngày`, `Sinh nhật sắp tới`, `Happy Birthday`]
      };
    } else if (diffDays === 0) {
      return {
        days: 0,
        isFuture: false,
        isToday: true,
        isPast: false,
        badge: `Sinh Nhật Hôm Nay! 🎂`,
        mainText: `Hôm nay là Sinh Nhật! 🎉`,
        secondaryText: `Chúc tuổi mới luôn rực rỡ và hạnh phúc!`,
        floatingWords: [`Sinh Nhật Hôm Nay`, `Happy Birthday`, `Tuổi Mới Rực Rỡ`]
      };
    } else {
      // Past birthday or birth date: check upcoming birthday this year / next year
      const thisYearBirthday = new Date(today.getFullYear(), target.getMonth(), target.getDate());
      thisYearBirthday.setHours(0, 0, 0, 0);
      let nextBirthday = thisYearBirthday;
      if (thisYearBirthday < today) {
        nextBirthday = new Date(today.getFullYear() + 1, target.getMonth(), target.getDate());
      }
      const daysUntilNext = Math.round((nextBirthday - today) / (1000 * 60 * 60 * 24));

      return {
        days: diffDays,
        daysUntilNext,
        isFuture: false,
        isToday: false,
        isPast: true,
        badge: daysUntilNext === 0 ? 'Sinh Nhật Hôm Nay! 🎂' : `Còn ${daysUntilNext} ngày đến Sinh Nhật`,
        mainText: daysUntilNext === 0 ? 'Hôm nay là Sinh Nhật! 🎂' : `Còn ${daysUntilNext} ngày nữa đến Sinh Nhật`,
        secondaryText: `Ngày sinh: ${formatDateVN(targetDate)}`,
        floatingWords: [`Sinh nhật vui vẻ`, `Happy Birthday`, daysUntilNext > 0 ? `Còn ${daysUntilNext} ngày` : 'Sinh Nhật Hôm Nay']
      };
    }
  }

  // Love / Anniversary
  if (diffDays > 0) {
    // In the past: We've been in love for X days!
    return {
      days: diffDays,
      isFuture: false,
      isToday: false,
      isPast: true,
      badge: `${diffDays.toLocaleString('vi-VN')} Ngày Yêu`,
      mainText: `Đã bên nhau ${diffDays.toLocaleString('vi-VN')} ngày ❤️`,
      secondaryText: `Từ ngày kỷ niệm ${formatDateVN(targetDate)}`,
      floatingWords: [
        `${diffDays} Ngày Yêu`,
        `${diffDays} Days Together`,
        `Bên nhau ${diffDays} ngày`,
        'Happy Anniversary'
      ]
    };
  } else if (diffDays === 0) {
    // Today!
    return {
      days: 0,
      isFuture: false,
      isToday: true,
      isPast: false,
      badge: `Kỷ Niệm Hôm Nay! ❤️`,
      mainText: `Hôm nay là ngày kỷ niệm đặc biệt! 🎉`,
      secondaryText: `${formatDateVN(targetDate)} — Yêu thương đong đầy`,
      floatingWords: ['Kỷ Niệm Hôm Nay', 'Happy Anniversary', 'Mãi Yêu Em']
    };
  } else {
    // Future date: Countdown
    const remaining = Math.abs(diffDays);
    return {
      days: remaining,
      isFuture: true,
      isToday: false,
      isPast: false,
      badge: `Còn ${remaining} ngày`,
      mainText: `Còn ${remaining} ngày nữa đến Ngày Kỷ Niệm 💖`,
      secondaryText: `Đếm ngược đến ${formatDateVN(targetDate)}`,
      floatingWords: [
        `Còn ${remaining} Ngày`,
        `Đếm ngược ${remaining} ngày`,
        `${remaining} Days Countdown`
      ]
    };
  }
}
