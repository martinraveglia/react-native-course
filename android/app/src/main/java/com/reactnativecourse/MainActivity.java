import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  // …

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

      @Override
      protected void loadApp(String appKey) {
        RNBootSplash.init(MainActivity.this);
        super.loadApp(appKey);
      }
    };
  }
}