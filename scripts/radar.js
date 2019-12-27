UI.AddCheckbox("Radar");
UI.AddCheckbox("Radar Enemies Only");
UI.AddColorPicker("Enemy Radar Blip Color");
UI.AddColorPicker("Teammate Radar Blip Color");
var screenSize = Global.GetScreenSize();
var radarpos = [((screenSize[0] / 2) - 150), (screenSize[1] / 1.39)];
var width = 300;
var height = 300;
var _drag_x = 300;
var _drag_y = 300;
var _dragging;
var _click;
var _resizing;
var _mouse_pos;

function deg2Rad (angle) {
    return angle * 0.017453292519943295
}
function onDrawEvent()
{
    if (!UI.IsMenuOpen())    {
        if(!UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Radar")) {
            return;
        }
        if(!Entity.IsValid(Entity.GetLocalPlayer()) && Entity.IsAlive(Entity.GetLocalPlayer()))
            return;
    }

    Render.GradientRect(radarpos[0], radarpos[1] - 4, width, 4, 1, [217, 157, 86, 255], [223, 174, 97, 255]); // top gradient
    Render.FilledRect(radarpos[0], radarpos[1], width, height, [44, 48, 55, 144]); // main
    Render.FilledRect(radarpos[0], radarpos[1], width, 20, [44, 48, 55, 144]); // top bar support
    Render.Line(radarpos[0] + (width / 2), radarpos[1] + (height - 2), radarpos[0] + (width / 2), radarpos[1] + 20, [125, 125, 125, 255]);
    Render.Line(radarpos[0], radarpos[1] + (height / 2) + 5, radarpos[0] + width, radarpos[1] + (height / 2) + 5, [125, 125, 125, 255]);
    Render.String(radarpos[0] + 7, radarpos[1] + 2, 0, "radar", [180, 180, 180, 255]);
    if (Global.IsKeyPressed(0x01)) {
        _click = true;
    }
    else {
        _click = false;
    }
   
    var _mouse_pos = Global.GetCursorPosition();
   
    function mouse_in_params(x, y, x2, y2){
    if (_mouse_pos[0] > x && _mouse_pos[1] > y && _mouse_pos[0] < (x2 + x) && _mouse_pos[1] < (y2 + y))
        return true;
    return false;
}
   
    if (_dragging && !_click)
        _dragging = false;
   
    if (_resizing && !_click)
        _resizing = false;
   
        if (_dragging && _click)
    {
        radarpos[0] = _mouse_pos[0] - _drag_x;
        radarpos[1] = _mouse_pos[1] - _drag_y;
    }
        if (_resizing && _click) {
        width = _mouse_pos[0] - radarpos[0];
        height = _mouse_pos[1] - radarpos[1];

        if (width < 200)
            width = 200;

        if (height < 200)
            height = 200;

        if (width > 600)
            width = 600;

        if (height > 600)
            height = 600;
    }
        if (mouse_in_params(radarpos[0], radarpos[1], width, height) && !(mouse_in_params(radarpos[0] + 20, radarpos[1] + 20, width - 10, height - 10)))
    {
        _dragging = true;
        _drag_x = _mouse_pos[0] - radarpos[0];
        _drag_y = _mouse_pos[1] - radarpos[1];
    }
        if (mouse_in_params(radarpos[0], radarpos[1], width, height) && !(mouse_in_params(radarpos[0], radarpos[1], width - 30, height - 30))) {
        _resizing = true;
    }
    var local = Entity.GetLocalPlayer();
    if (!Entity.IsAlive(local)){
        return
    }
    var localangles = Global.GetViewAngles();
    var entities = Entity.GetEntities();
    for (var i = 1; i <= entities.length; i++) {
        var entity = entities[i];
        if (!entity || !Entity.IsValid(entity) || !Entity.IsAlive(entity) || Entity.IsLocalPlayer(entity))
        {continue;}
        if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Radar Enemies Only") && Entity.IsTeammate(entity))
        {continue;}
        var entity_position = Entity.GetRenderOrigin(entity);
        var local_position = Entity.GetRenderOrigin(local);
        var angle = deg2Rad(localangles[1]);
        var radar_x = local_position[0] - entity_position[0];
        var radar_y = local_position[1] - entity_position[1];
        var rotate_x = radar_y * Math.cos(angle) - radar_x * Math.sin(angle);
        var rotate_y = radar_x * Math.cos(angle) + radar_y * Math.sin(angle);
        var final_x = (radarpos[0] + (width / 2)) + rotate_x / 10;
        var final_y = (radarpos[1] + 5 + (height / 2)) + rotate_y / 10;
        var blipColor;
       
        if (final_x < radarpos[0]) {
            final_x = radarpos[0];
        }
        if (final_x > (radarpos[0] + width)) {
            final_x = radarpos[0] + width - 3;
        }
        if (final_y < (radarpos[1] + 20)) {
            final_y = radarpos[1] + 22;
        }
        if (final_y > (radarpos[1] + height)) {
            final_y = radarpos[1] + height - 2;
        }
        if (Entity.IsTeammate(entity))
            blipColor = UI.GetColor("MISC", "JAVASCRIPT", "Script Items", "Teammate Radar Blip Color");
        if (!Entity.IsTeammate(entity)){
            if (!Entity.IsDormant(entity)){
            blipColor = UI.GetColor("MISC", "JAVASCRIPT", "Script Items", "Enemy Radar Blip Color");}
            else{
            blipColor = [125, 125, 125, 255];} //teammates can't be dormant, so enemies only.
        }
        Render.FilledRect(final_x, final_y, 4, 4, blipColor);
        health = Entity.GetProp(entity, "CBasePlayer", "m_iHealth").toString();
        Render.String(final_x - 1, final_y + 6, 0, (Entity.GetName(entity).toLowerCase()), [255, 255, 255, 255], 2);
        Render.String(final_x - 1, final_y + 14, 0, "h: " + health, [255, 255, 255, 255], 2);
        Render.String(final_x - 1, final_y + 22, 0, (Entity.GetName(Entity.GetWeapon(entity))), [255, 255, 255, 255], 2);
       
    }
}
Global.RegisterCallback("Draw", "onDrawEvent");