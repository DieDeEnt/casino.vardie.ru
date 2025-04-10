import requests
import csv
from datetime import datetime

def get_csgo_skins():
    base_url = "https://api.skinport.com/v1/"
    headers = {
        "Accept": "application/json"
    }
    
    # Получаем все предметы CSGO
    response = requests.get(f"{base_url}items", params={"app_id": 730}, headers=headers)
    items = response.json()
    
    skins_data = []
    
    for item in items:
        # Основные характеристики
        name = item.get('market_name', '')
        price = item.get('price', '')
        rarity = item.get('rarity', '')
        item_type = item.get('type', '')
        quality = item.get('quality', '')
        
        # Дополнительные характеристики для оружия
        float_value = item.get('wear', '') if 'wear' in item else ''
        pattern = item.get('pattern', '') if 'pattern' in item else ''
        
        # URL изображения
        image_url = item.get('image', '')
        
        skins_data.append([
            name,
            price,
            rarity,
            item_type,
            quality,
            float_value,
            pattern,
            image_url
        ])
    
    return skins_data

def save_to_csv(data):
    filename = f"csgo_skins_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        
        # Записываем заголовки
        writer.writerow([
            "name",
            "price",
            "rarity",
            "type",
            "quality",
            "floatValue",
            "pattern",
            "imageUrl"
        ])
        
        # Записываем данные
        writer.writerows(data)
    
    print(f"Данные сохранены в файл: {filename}")

if __name__ == "__main__":
    print("Собираем данные о скинах CSGO с Skinport API...")
    skins = get_csgo_skins()
    save_to_csv(skins)