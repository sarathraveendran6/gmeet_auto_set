from PIL import Image, ImageDraw

def create_icon(size):
    # Create a new image with a transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Calculate proportions based on size
    body_width = int(size * 0.53)
    body_height = int(size * 0.375)
    body_x = int(size * 0.234)
    body_y = int(size * 0.3125)
    
    lens_radius = int(size * 0.156)
    inner_lens_radius = int(size * 0.094)
    
    # Draw camera body
    draw.rounded_rectangle(
        [(body_x, body_y), (body_x + body_width, body_y + body_height)],
        radius=int(size * 0.0625),
        fill='#1a73e8'
    )
    
    # Draw camera lens
    center = (size // 2, size // 2)
    draw.ellipse(
        [center[0] - lens_radius, center[1] - lens_radius,
         center[0] + lens_radius, center[1] + lens_radius],
        fill='#4285f4'
    )
    draw.ellipse(
        [center[0] - inner_lens_radius, center[1] - inner_lens_radius,
         center[0] + inner_lens_radius, center[1] + inner_lens_radius],
        fill='#1a73e8'
    )
    
    # Draw slash
    margin = int(size * 0.156)
    draw.line(
        [(margin, margin), (size - margin, size - margin)],
        fill='#ea4335',
        width=int(size * 0.0625)
    )
    
    return img

# Generate icons of different sizes
sizes = [16, 48, 128]
for size in sizes:
    icon = create_icon(size)
    icon.save(f'images/icon{size}.png')

print("Icons generated successfully!") 