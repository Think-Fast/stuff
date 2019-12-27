// edited by lexak

var screen_size = Global.GetScreenSize();
UI.AddColorPicker("DESYNC");
UI.AddColorPicker("RIGHT/LEFT");
UI.AddColorPicker("HIDE SHOTS ON");
UI.AddColorPicker("HIDE SHOTS OFF");
UI.AddColorPicker("FAKE DUCK ON");
UI.AddColorPicker("FAKE DUCK OFF");
UI.AddColorPicker("DOUBLETAP ON");
UI.AddColorPicker("DOUBLETAP OFF");
UI.AddColorPicker("SAFE POINT ON");
UI.AddColorPicker("SAFE POINT OFF");
UI.AddColorPicker("HITBOX OVERRIDE ON");
UI.AddColorPicker("HITBOX OVERRIDE OFF");
UI.AddColorPicker("SLOW WALK ON");
UI.AddColorPicker("SLOW WALK OFF");
var isInverted;

function drawString()
{
    textcp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "DESYNC");
    text_red = textcp[0];
    text_green = textcp[1];
    text_blue = textcp[2];
    text_alpha = textcp[3];

    invertedcp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "RIGHT/LEFT");
    inverted_red = invertedcp[0];
    inverted_green = invertedcp[1];
    inverted_blue = invertedcp[2];
    inverted_alpha = invertedcp[3];

    hidecp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "HIDE SHOTS ON");
    hide_red = hidecp[0];
    hide_green = hidecp[1];
    hide_blue = hidecp[2];
    hide_alpha = hidecp[3];

    hidencp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "HIDE SHOTS OFF");
    hiden_red = hidencp[0];
    hiden_green = hidencp[1];
    hiden_blue = hidencp[2];
    hiden_alpha = hidencp[3];

    dtcp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "DOUBLETAP ON");
    dt_red = dtcp[0];
    dt_green = dtcp[1];
    dt_blue = dtcp[2];
    dt_alpha = dtcp[3];

    dtncp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "DOUBLETAP OFF");
    dtn_red = dtncp[0];
    dtn_green = dtncp[1];
    dtn_blue = dtncp[2];
    dtn_alpha = dtncp[3];

    sfcp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "SAFE POINT ON");
    sf_red = sfcp[0];
    sf_green = sfcp[1];
    sf_blue = sfcp[2];
    sf_alpha = sfcp[3];

    sfncp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "SAFE POINT OFF");
    sfn_red = sfncp[0];
    sfn_green = sfncp[1];
    sfn_blue = sfncp[2];
    sfn_alpha = sfncp[3];

    hitboxcp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "HITBOX OVERRIDE ON");
    hitbox_red = hitboxcp[0];
    hitbox_green = hitboxcp[1];
    hitbox_blue = hitboxcp[2];
    hitbox_alpha =  hitboxcp[3];

    hitboxncp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "HITBOX OVERRIDE OFF");
    hitboxn_red = hitboxncp[0];
    hitboxn_green = hitboxncp[1];
    hitboxn_blue = hitboxncp[2];
    hitboxn_alpha = hitboxncp[3];

    fakeduckcp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "FAKE DUCK ON");
    fakeduck_red = fakeduckcp[0];
    fakeduck_green = fakeduckcp[1];
    fakeduck_blue = fakeduckcp[2];
    fakeduck_alpha = fakeduckcp[3];

    fakeduckncp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "FAKE DUCK OFF");
    fakeduckn_red = fakeduckncp[0];
    fakeduckn_green = fakeduckncp[1];
    fakeduckn_blue = fakeduckncp[2];
    fakeduckn_alpha = fakeduckncp[3];

    slowwalkcp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "SLOW WALK ON");
    slowwalk_red = slowwalkcp[0];
    slowwalk_green = slowwalkcp[1];
    slowwalk_blue = slowwalkcp[2];
    slowwalk_alpha = slowwalkcp[3];

    slowwalkncp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "SLOW WALK OFF");
    slowwalkn_red = slowwalkncp[0];
    slowwalkn_green = slowwalkncp[1];
    slowwalkn_blue = slowwalkncp[2];
    slowwalkn_alpha = slowwalkncp[3];


    isHideshots = UI.IsHotkeyActive("Rage", "Exploits", "Hide shots");
    isSafepoint = UI.IsHotkeyActive("Rage", "General", "Safe point override");
    isDoubletap = UI.IsHotkeyActive("Rage", "Exploits", "Doubletap");
    isHitboxoverride = UI.IsHotkeyActive("Rage", "General config", "Hitbox override");
    isFakeduck = UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck");
    isInverted = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
    isSlowwalk = UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk");


    if(1)
    {
        Render.String(screen_size[0] /2 + 14, screen_size[1] /2 +50, 0, "DESYNC", [ text_red, text_green, text_blue, text_alpha ], 3 );
        Render.String(screen_size[0] /2 + 14, screen_size[1] /2 +58, 0, isInverted ? "LEFT" : "RIGHT", [ inverted_red, inverted_green, inverted_blue, inverted_alpha ],3 );
        Render.String(screen_size[0] /2 + 14, screen_size[1] /2 +66, 0, isHideshots ? "HIDE" : "HIDE", isHideshots ? [ hide_red, hide_green, hide_blue, hide_alpha ] : [ hiden_red, hiden_green, hiden_blue, hiden_alpha  ],3 );
        Render.String(screen_size[0] /2 + 14, screen_size[1] /2 +74, 0, isFakeduck ? "FD" : "FD", isFakeduck ? [ fakeduck_red, fakeduck_green, fakeduck_blue, fakeduck_alpha ] : [ fakeduckn_red, fakeduckn_green, fakeduckn_blue, fakeduckn_alpha ],3 );
        Render.String(screen_size[0] /2 + 14, screen_size[1] /2 +82, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [ dt_red, dt_green, dt_blue, dt_alpha ] : [ dtn_red, dtn_green, dtn_blue, dtn_alpha ],3 );
        Render.String(screen_size[0] /2 + 14, screen_size[1] /2 +90, 0, isSafepoint ? "SP" : "SP", isSafepoint ? [ sf_red, sf_green, sf_blue, sf_alpha ] : [ sfn_red, sfn_green, sfn_blue, sfn_alpha ],3 );
        Render.String(screen_size[0] /2 + 14, screen_size[1] /2 +98, 0, isHitboxoverride ? "HITBOX" : "HITBOX", isHitboxoverride ? [ hitbox_red, hitbox_green, hitbox_blue, hitbox_alpha ] : [ hitboxn_red, hitboxn_green, hitboxn_blue, hitboxn_alpha ],3 );
        Render.String(screen_size[0] /2 + 14, screen_size[1] /2 +106, 0, isSlowwalk ? "SLOW WALK" : "SLOW WALK", isSlowwalk ? [ slowwalk_red, slowwalk_green, slowwalk_blue, slowwalk_alpha ] : [ slowwalkn_red, slowwalkn_green, slowwalkn_blue, slowwalkn_alpha ],3 );
    }
}


function Main()
{

    //  callbacks
    Global.RegisterCallback("Draw", "drawString")
}
Main();