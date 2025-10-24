import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Gift {
  id: number;
  name: string;
  category: string;
  reserved: boolean;
  reservedBy?: string;
}

const Index = () => {
  const [gifts, setGifts] = useState<Gift[]>([
    { id: 1, name: 'Коляска-трансформер', category: 'Прогулки', reserved: false },
    { id: 2, name: 'Автокресло 0+', category: 'Безопасность', reserved: false },
    { id: 3, name: 'Комплект постельного белья', category: 'Текстиль', reserved: false },
    { id: 4, name: 'Радионяня', category: 'Техника', reserved: false },
    { id: 5, name: 'Развивающий коврик', category: 'Игрушки', reserved: false },
    { id: 6, name: 'Стерилизатор для бутылочек', category: 'Кормление', reserved: false },
    { id: 7, name: 'Набор пеленок (10 шт)', category: 'Текстиль', reserved: false },
    { id: 8, name: 'Ванночка с горкой', category: 'Купание', reserved: false },
    { id: 9, name: 'Молокоотсос', category: 'Кормление', reserved: false },
    { id: 10, name: 'Слинг или эргорюкзак', category: 'Прогулки', reserved: false },
    { id: 11, name: 'Мобиль на кроватку', category: 'Игрушки', reserved: false },
    { id: 12, name: 'Набор боди (5 шт)', category: 'Одежда', reserved: false },
  ]);

  const [reserveName, setReserveName] = useState('');
  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);
  
  const dueDate = new Date('2025-03-15T00:00:00');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = dueDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleReserve = (giftId: number) => {
    if (reserveName.trim()) {
      setGifts(gifts.map(gift => 
        gift.id === giftId 
          ? { ...gift, reserved: true, reservedBy: reserveName }
          : gift
      ));
      setReserveName('');
      setSelectedGiftId(null);
    }
  };

  const handleUnreserve = (giftId: number) => {
    setGifts(gifts.map(gift => 
      gift.id === giftId 
        ? { ...gift, reserved: false, reservedBy: undefined }
        : gift
    ));
  };

  const categoryIcons: Record<string, string> = {
    'Прогулки': 'Baby',
    'Безопасность': 'Shield',
    'Текстиль': 'Shirt',
    'Техника': 'Zap',
    'Игрушки': 'Sparkles',
    'Кормление': 'Milk',
    'Купание': 'Droplet',
    'Одежда': 'ShoppingBag'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative">
        <section className="py-20 px-4 text-center animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <img 
                src="https://cdn.poehali.dev/projects/afdca65d-4f90-48b8-aa99-a9bd52176adc/files/1829c19d-92b4-486d-8c27-97d38c2fb9ed.jpg" 
                alt="Baby items" 
                className="w-48 h-48 object-cover rounded-3xl shadow-lg"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              Скоро чудо! 👶
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              Мы ждем нашего малыша
            </p>
            <div className="inline-block bg-primary/10 px-6 py-3 rounded-full">
              <p className="text-lg font-medium text-primary">
                Предполагаемая дата рождения: 15 марта 2025
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 max-w-5xl mx-auto animate-fade-in">
          <h2 className="text-4xl font-bold text-center mb-8">До встречи осталось</h2>
          <Card className="bg-gradient-to-br from-primary/5 to-accent/10 border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{timeLeft.days}</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wide">Дней</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{timeLeft.hours}</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wide">Часов</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{timeLeft.minutes}</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wide">Минут</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{timeLeft.seconds}</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wide">Секунд</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="about" className="py-16 px-4 max-w-6xl mx-auto animate-fade-in">
          <h2 className="text-4xl font-bold text-center mb-12">О малыше</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card/80 backdrop-blur border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Имя</h3>
                <p className="text-muted-foreground">Пока сюрприз! 🎁</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Sparkles" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Пол</h3>
                <p className="text-muted-foreground">Узнаем вместе с вами! ✨</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Calendar" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Срок</h3>
                <p className="text-muted-foreground">34 недельки 💫</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 px-4 max-w-6xl mx-auto animate-fade-in">
          <h2 className="text-4xl font-bold text-center mb-4">Наши особенные моменты</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Фотографии с УЗИ — первые снимки нашего малыша 💕
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <img 
                src="https://cdn.poehali.dev/projects/afdca65d-4f90-48b8-aa99-a9bd52176adc/files/e92b7ec7-7522-49b7-b268-8169892a028f.jpg"
                alt="УЗИ профиль малыша"
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Профиль малыша</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <img 
                src="https://cdn.poehali.dev/projects/afdca65d-4f90-48b8-aa99-a9bd52176adc/files/45c3d66f-80de-4b03-aaaf-b45eb3a3c8fa.jpg"
                alt="УЗИ ножки малыша"
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Крошечные ножки</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <img 
                src="https://cdn.poehali.dev/projects/afdca65d-4f90-48b8-aa99-a9bd52176adc/files/1986c4b2-24ed-4af0-a037-e77a7ee10157.jpg"
                alt="УЗИ ручка малыша"
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Нежная ручка</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gifts" className="py-16 px-4 max-w-6xl mx-auto animate-fade-in">
          <h2 className="text-4xl font-bold text-center mb-4">Список подарков</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Если вы хотите сделать подарок, можете забронировать что-то из списка. 
            Так мы избежим дублирования и получим именно то, что нам нужно ❤️
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map((gift) => (
              <Card 
                key={gift.id} 
                className={`bg-card/80 backdrop-blur border-2 transition-all hover:shadow-lg ${
                  gift.reserved ? 'opacity-75' : 'hover:scale-105'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                      <Icon name={categoryIcons[gift.category] || 'Gift'} size={24} className="text-primary" />
                    </div>
                    <Badge variant={gift.reserved ? "secondary" : "default"} className="text-xs">
                      {gift.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4">{gift.name}</h3>
                  
                  {gift.reserved ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Check" size={16} />
                        <span>Забронировано: {gift.reservedBy}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleUnreserve(gift.id)}
                      >
                        Отменить бронь
                      </Button>
                    </div>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full" 
                          onClick={() => setSelectedGiftId(gift.id)}
                        >
                          <Icon name="Gift" size={16} className="mr-2" />
                          Забронировать
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Забронировать подарок</DialogTitle>
                          <DialogDescription>
                            Вы хотите подарить: {gift.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div>
                            <Label htmlFor="name">Ваше имя</Label>
                            <Input
                              id="name"
                              placeholder="Введите ваше имя"
                              value={reserveName}
                              onChange={(e) => setReserveName(e.target.value)}
                            />
                          </div>
                          <Button 
                            className="w-full" 
                            onClick={() => selectedGiftId && handleReserve(selectedGiftId)}
                            disabled={!reserveName.trim()}
                          >
                            Подтвердить бронь
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="contacts" className="py-16 px-4 max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты и информация</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/80 backdrop-blur border-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Роддом</h3>
                </div>
                <p className="text-muted-foreground mb-2">Городская больница №5</p>
                <p className="text-sm text-muted-foreground">ул. Медицинская, 123</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Связь</h3>
                </div>
                <p className="text-muted-foreground mb-2">Мария: +7 (999) 123-45-67</p>
                <p className="text-muted-foreground">Алексей: +7 (999) 765-43-21</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-2 md:col-span-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Info" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Важная информация</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Посещения в роддоме разрешены после 15:00</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Подарки можно передать через медсестёр на посту</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Мы будем рады видеть вас на выписке! Следите за новостями</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="py-12 text-center text-muted-foreground">
          <p className="text-lg">
            С любовью и благодарностью 💕
          </p>
          <p className="text-sm mt-2">
            Спасибо, что разделяете с нами это счастье!
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;