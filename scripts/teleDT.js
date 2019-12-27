var iExploitID = 0;
var bShouldRecharge = false;
var ForceCharge = false;
var iLastShotTime = 0;


UI.AddCheckbox( "Better double(triple)-tap" );
UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", 1 );

function event_rbot_fire( ) {
    iExploitID = Event.GetInt( "exploit" );
}

function hook_create_move( ) {
    if ( !UI.GetValue( "Misc", "JAVASCRIPT", "Script Items", "Better double(triple)-tap" ) )
        return;

    if ( iExploitID == 2 ) {
        iLastShotTime = Global.Tickcount( );
        UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", 0 );
        bShouldRecharge = true;
    }

    ForceCharge = bShouldRecharge ? true : false;

    if ( ForceCharge && Global.Tickcount( ) >= ( Global.TickInterval( ) * 10 + iLastShotTime ) )
        UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", 1 );
}
Global.RegisterCallback( "CreateMove", "hook_create_move" );
Global.RegisterCallback( "ragebot_fire", "event_rbot_fire" );