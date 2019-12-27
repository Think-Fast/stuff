var kill_count = 0;
var should_draw = false;
var resolution = Global.GetScreenSize();
var started_drawing = 0;
var r = 255;
var g = 0;
var b = 0;

UI.AddSliderInt( "Killstreak reset after", 1, 30 );

function event_draw( ) {
    reset_after = UI.GetValue( "Killstreak reset after" );

    if( r > 0 && b == 0 ) {
        r--;
        g++;
      }
      if( g > 0 && r == 0 ) {
        g--;
        b++;
      }
      if( b > 0 && g == 0 ) {
        r++;
        b--;
      }

    if ( ( Global.Tickcount( ) - ( reset_after * 100 ) ) > started_drawing )
        kill_count = 0;

    if ( should_draw &&  ( Global.Tickcount( ) - 150 ) > started_drawing )
        should_draw = false;

    if ( should_draw ) {
        switch ( kill_count ) {
            case 1: {
                Render.String( resolution[ 0 ] / 2, 150, 1, "KILL!", [ r, g, b, 255 ], 48 );
                break;
            }
            case 2: {
                Render.String( resolution[ 0 ] / 2, 150, 1, "DOUBLE KILL!", [ r, g, b, 255 ], 48 );
                break;
            }
            case 3: {
                Render.String( resolution[ 0 ] / 2, 150, 1, "MULTI KILL!", [ r, g, b, 255 ], 48 );
                break;
            }
            case 4: {
                Render.String( resolution[ 0 ] / 2, 150, 1, "MEGA KILL!", [ r, g, b, 255 ], 48 );
                break;
            }
            case 5: {
                Render.String( resolution[ 0 ] / 2, 150, 1, "ULTRA KILL!", [ r, g, b, 255 ], 48 );
                break;
            }
            case 6: {
                Render.String( resolution[ 0 ] / 2, 150, 1, "MONSTER KILL!", [ r, g, b, 255 ], 48 );
                break;
            }
            case ( ( kill_count >= 6 && kill_count <= 32 ) ? kill_count:-1 ): {
                //lets hope no one exceeds 32 kills :clown:
                Render.String( resolution[ 0 ] / 2, 150, 1, "LEGENDARY!", [ r, g, b, 255 ], 48 );
                break;
            }
        }
    }
}

function event_player_death( ) {
    target = Event.GetInt( "userid" );
    target_id = Entity.GetEntityFromUserID( target );
    attacker = Event.GetInt( "attacker" );
    attacker_id = Entity.GetEntityFromUserID( attacker );

    if ( ( Entity.GetLocalPlayer( ) === target_id ) || ( Entity.GetLocalPlayer( ) !== attacker_id ) ) {
        return;
    }

    kill_count = kill_count + 1;
    should_draw = true;
    started_drawing = Global.Tickcount();
}

Global.RegisterCallback( "player_death", "event_player_death" );
Global.RegisterCallback( "Draw", "event_draw" );