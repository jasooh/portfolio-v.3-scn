const fragment = /* glsl*/ `


varying vec3 vColor;
varying vec3 vPosition;


void main() {

  vec3 color = vColor;


  //Add some light
  vec3 light= vec3(0.0);

  vec3 normal = normalize(cross(dFdx(vec3(vPosition)), dFdy(vec3(vPosition))));
  vec3 viewDir = normalize(cameraPosition - vPosition);

  //Ambient
  vec3 ambient = vec3(0.5);
  light = ambient;

  //Diffuse light

  vec3 lightDir = normalize(vec3(1.0));
  vec3 lightColor = vec3(1.0,0.98,0.8723);
  float dp = max(0.0, dot(viewDir, normal));

  vec3 diffuse = dp * lightColor;

  //Specular
  vec3 specular = vec3(0.0);

  vec3 r= normalize(reflect(-lightDir, normal));
  float phong = max(0.0, dot(viewDir, r));
  phong = pow(phong, 8.0);

  specular +=phong;

  //Fresnel
  float fresnel = 1.0 - max(0.0, dot(viewDir, normal));
  fresnel = pow(fresnel,2.0);

  specular *=fresnel;
  
  //Combine
  light += diffuse;

  color = color * light + specular;
   gl_FragColor = vec4(color, 1.0);

}`;

export default fragment;
